   export async function onRequest(context) {
     const { request } = context;

     if (request.method !== 'POST') {
       return new Response(JSON.stringify({ error: 'Method not allowed' }), {
         status: 405,
         headers: { 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*' },
       });
     }

     try {
       const formData = await request.formData();
       const name = formData.get('name') || 'Not provided';
       const email = formData.get('email') || 'Not provided';
       const company = formData.get('company') || 'Not provided';
       const interest = formData.get('interest') || 'Not provided';
       const message = formData.get('message') || 'Not provided';

       const feishuPayload = {
         msg_type: 'interactive',
         card: {
           header: {
             title: { tag: 'plain_text', content: '📩 New Inquiry from
 Xarvanta.com' },
             template: 'blue',
           },
           elements: [
             {
               tag: 'div',
               text: {
                 tag: 'lark_md',
                 content: `**Name:** ${name}\n**Email:**
 ${email}\n**Company:** ${company}\n**Interest:**
 ${interest}\n\n**Message:**\n${message}`,
               },
             },
             { tag: 'hr' },
             {
               tag: 'note',
               elements: [{ tag: 'plain_text', content: `Received at ${new
 Date().toISOString()}` }],
             },
           ],
         },
       };

       const webhookUrl =
 'https://open.feishu.cn/open-apis/bot/v2/hook/a37d3028-bac8-4bcf-8586-3b192a4
 8414a';
       const feishuRes = await fetch(webhookUrl, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(feishuPayload),
       });

       const feishuResult = await feishuRes.json();

       if (feishuResult.code !== 0) {
         return new Response(JSON.stringify({ success: false, error: 'Failed
 to send notification' }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' },
         });
       }

       return new Response(JSON.stringify({ success: true }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' },
       });

     } catch (err) {
       return new Response(JSON.stringify({ success: false, error: err.message
 }), {
         status: 500,
         headers: { 'Content-Type': 'application/json' },
       });
     }
   }
