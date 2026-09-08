import { EmailTemplate, AdminOrder } from '../types/admin';
import { COMPANY_INFO } from '../data/mockData';

export const DEFAULT_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tmpl-order-confirmed',
    key: 'order_confirmed',
    title: 'Order Confirmed',
    subject: 'Order Confirmed! #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{order_total}}',
      '{{order_status}}',
      '{{delivery_address}}',
      '{{order_date}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Dear {{customer_name}},

Thank you for choosing {{company_name}}! We are delighted to confirm that your order #{{order_number}} has been received and confirmed by our production desk.

Order Summary:
- Order Number: {{order_number}}
- Order Date: {{order_date}}
- Total: {{order_total}}
- Delivery Destination: {{delivery_address}}

Our creative specialists are reviewing your artwork specifications to ensure premium color accuracy and flawless finishing. You will receive an update as soon as production begins.

If you have any instant questions, reply directly to this email or chat with our team on WhatsApp: +256 787 662 183.

Warm regards,
The Production Team
{{company_name}}
Plot 42, Nkrumah Road & Jinja Road Creative Studio, Kampala`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-processing',
    key: 'processing',
    title: 'Order In Production',
    subject: 'Production Started on Order #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{order_total}}',
      '{{order_status}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Hello {{customer_name}},

Exciting news! Your branded items for order #{{order_number}} are now officially in PRODUCTION on our commercial press floor.

Our team is printing, cutting, assembling, and inspecting each piece to meet the highest SozyImpressions quality standards.

Current Status: {{order_status}}
Total Value: {{order_total}}

We will notify you immediately once your order clears final quality assurance and is packed for dispatch.

Best regards,
{{company_name}}
We Build Brands That Stand Out.`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-ready-delivery',
    key: 'ready_delivery',
    title: 'Ready for Delivery / Pickup',
    subject: 'Your Order #{{order_number}} is Ready! - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{order_total}}',
      '{{delivery_address}}',
      '{{tracking_information}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Dear {{customer_name}},

Your order #{{order_number}} has passed our rigorous quality inspection and is now packaged and READY FOR DISPATCH / PICKUP!

Delivery Details:
- Address: {{delivery_address}}
- Tracking / Notes: {{tracking_information}}

Our courier driver is scheduling the delivery run. Please ensure someone is available at the delivery location or contact us if you require special delivery timing.

Thank you for trusting {{company_name}}.

Warm regards,
Logistics & Fulfillment Team
{{company_name}}`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-out-for-delivery',
    key: 'out_for_delivery',
    title: 'Out for Delivery',
    subject: 'Out for Delivery: Order #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{delivery_address}}',
      '{{tracking_information}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Hello {{customer_name}},

Your SozyImpressions package for order #{{order_number}} is now OUT FOR DELIVERY with our Kampala courier!

Destination: {{delivery_address}}
Courier Reference: {{tracking_information}}

Please keep your phone line active. The driver will ring you upon arrival.

Need assistance? Call our desk directly at +256 709 390 168.

Kind regards,
Delivery Desk
{{company_name}}`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-completed',
    key: 'completed',
    title: 'Order Completed',
    subject: 'Delivered & Completed: Order #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{order_total}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Dear {{customer_name}},

Your order #{{order_number}} has been successfully delivered and marked as COMPLETED!

We hope you are thrilled with your customized prints and branded merchandise. It has been a true pleasure bringing your ideas to life.

Your official downloadable tax receipt is available anytime in your Client Portal or upon request.

Tag us on Instagram @sozyimpressions to showcase your brand!

With gratitude,
Management & Creative Crew
{{company_name}}`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-cancelled',
    key: 'cancelled',
    title: 'Order Cancelled',
    subject: 'Order Notice: Cancellation of Order #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Dear {{customer_name}},

This is to confirm that order #{{order_number}} has been CANCELLED as requested or due to payment/specification adjustments.

If this was done in error or if you wish to reinstate this job, please contact your account manager immediately at sales@sozyimpressions.com or call +256 787 662 183.

Sincerely,
Accounts Department
{{company_name}}`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-payment-received',
    key: 'payment_received',
    title: 'Payment Received',
    subject: 'Payment Confirmed for Order #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{order_total}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Dear {{customer_name}},

We have successfully verified and received your payment of {{order_total}} for order #{{order_number}}.

Your order is now prioritized in our production pipeline. Your official receipt has been attached and logged to your customer profile.

Thank you for your prompt settlement!

Best regards,
Finance Department
{{company_name}}`,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tmpl-payment-failed',
    key: 'payment_failed',
    title: 'Payment Pending / Failed',
    subject: 'Action Required: Payment for Order #{{order_number}} - SozyImpressions',
    variables: [
      '{{customer_name}}',
      '{{order_number}}',
      '{{order_total}}',
      '{{company_name}}'
    ],
    bodyTemplate: `Dear {{customer_name}},

We were unable to verify payment for order #{{order_number}} (Total: {{order_total}}).

To prevent delays in production, please retry via MTN Mobile Money, Airtel Money, or Card, or contact our accounts desk with your mobile money transaction reference ID.

WhatsApp Help: +256 787 662 183
Phone: +256 709 390 168

Thank you,
Accounts Desk
{{company_name}}`,
    updatedAt: new Date().toISOString()
  }
];

/**
 * Replaces placeholders in template with actual order details
 */
export const renderTemplateText = (
  text: string,
  order: Partial<AdminOrder>,
  trackingInfo = 'Kampala Express Dispatch (Driver assigned)'
): string => {
  const map: Record<string, string> = {
    '{{customer_name}}': order.customerName || 'Valued Customer',
    '{{order_number}}': order.orderNumber || order.id || 'SOZ-0000',
    '{{order_total}}': order.totalUGX ? `UGX ${order.totalUGX.toLocaleString()}` : 'UGX 0',
    '{{order_status}}': (order.orderStatus || 'confirmed').replace('_', ' ').toUpperCase(),
    '{{delivery_address}}': order.deliveryAddress || 'Kampala, Uganda',
    '{{order_date}}': order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString(),
    '{{tracking_information}}': trackingInfo,
    '{{company_name}}': COMPANY_INFO.name,
  };

  let rendered = text;
  Object.entries(map).forEach(([key, val]) => {
    rendered = rendered.split(key).join(val);
  });
  return rendered;
};

/**
 * Generates rich HTML email preview for admin modal
 */
export const generateHtmlEmailPreview = (
  subject: string,
  bodyContent: string,
  order?: Partial<AdminOrder>
): string => {
  const formattedBody = bodyContent.replace(/\n/g, '<br/>');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
      
      <!-- Top Brand Header -->
      <div style="background: linear-gradient(135deg, #2D3094 0%, #2E3192 100%); padding: 24px 28px; text-align: left; border-bottom: 4px solid #ED008C;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">SOZYIMPRESSIONS</h1>
              <p style="color: #FCE7F3; margin: 4px 0 0 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">We Build Brands That Stand Out</p>
            </td>
            <td style="text-align: right;">
              <span style="background-color: rgba(255,255,255,0.15); color: #ffffff; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; display: inline-block;">
                OFFICIAL NOTIFICATION
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Subject & Metadata -->
      <div style="background-color: #F8FAFC; padding: 14px 28px; border-bottom: 1px solid #E2E8F0;">
        <p style="margin: 0; font-size: 12px; color: #64748B;"><strong>Subject:</strong> ${subject}</p>
        <p style="margin: 4px 0 0 0; font-size: 11px; color: #94A3B8;">Sent to: ${order?.customerEmail || 'customer@client.com'} | Order: ${order?.orderNumber || order?.id || 'SOZ-DEMO'}</p>
      </div>

      <!-- Body Content -->
      <div style="padding: 28px; color: #1E293B; font-size: 14px; line-height: 1.7;">
        ${formattedBody}
      </div>

      <!-- Brand Footer -->
      <div style="background-color: #F1F5F9; padding: 20px 28px; text-align: center; border-top: 1px solid #E2E8F0; color: #64748B; font-size: 11px;">
        <p style="margin: 0 0 6px 0; font-weight: 700; color: #2D3094;">Sozy Impressions Ltd — Kampala, Uganda</p>
        <p style="margin: 0 0 6px 0;">Plot 42, Nkrumah Road & Jinja Road Creative Studio</p>
        <p style="margin: 0; color: #94A3B8;">Call: +256 709 390 168 | WhatsApp: +256 787 662 183 | sales@sozyimpressions.com</p>
      </div>
    </div>
  `;
};
