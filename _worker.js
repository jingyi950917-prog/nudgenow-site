export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 逻辑分流：只有当地址栏包含 ?paymentId= 时，才执行查账逻辑
    if (url.searchParams.has("paymentId")) {
      const paymentId = url.searchParams.get("paymentId");
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      try {
        const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
          method: 'GET',
          headers: { 'x-api-key': env.NOW_API_KEY } 
        });
        const data = await response.json();

        return new Response(JSON.stringify({ 
          isPaid: data.payment_status === 'finished',
          status: data.payment_status 
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

      } catch (e) {
        return new Response(JSON.stringify({ error: "查询失败" }), { status: 500, headers: corsHeaders });
      }
    }

    // 重要：如果不是查账请求，直接把请求交给静态资源（index.html 等）
    return env.ASSETS.fetch(request);
  }
};
