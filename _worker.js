export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // 允许你的网站调用
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    };

    // 预检请求处理
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    const url = new URL(request.url);
    const paymentId = url.searchParams.get("paymentId");

    if (!paymentId) {
      return new Response(JSON.stringify({ error: "缺少 Payment ID" }), { status: 400, headers: corsHeaders });
    }

    try {
      // 这里的 API_KEY 会在下一步设置，不要直接写在这里
      const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
        method: 'GET',
        headers: { 'x-api-key': env.NOW_API_KEY } 
      });

      const data = await response.json();

      // 只返回给前端：是否支付成功 (finished)
      return new Response(JSON.stringify({ 
        isPaid: data.payment_status === 'finished',
        status: data.payment_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: "查询失败" }), { status: 500, headers: corsHeaders });
    }
  }
};
