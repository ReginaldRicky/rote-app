import { FiMessageCircle } from "react-icons/fi";
import { useToast } from "../../components/useToast";

export const BUSINESS_WHATSAPP_NUMBER = "+62 823-8802-5390";

export function normalizeWhatsAppNumber(phone) {
  const cleanPhone = String(phone || BUSINESS_WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  const { warning } = useToast();

  if (!cleanPhone) return "";

  if (cleanPhone.startsWith("0")) {
    return `62${cleanPhone.slice(1)}`;
  }

  return cleanPhone;
}

export function createWhatsAppUrl(phone, message) {
  const formattedPhone = normalizeWhatsAppNumber(phone);

  if (!formattedPhone) return "";

  const defaultMessage = "Halo Nick's Holiday, saya ingin bertanya tentang layanan tour and travel.";
  const encodedMessage = encodeURIComponent(message || defaultMessage);

  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

export default function WhatsAppButton({
  phone = BUSINESS_WHATSAPP_NUMBER,
  message,
  label = "Chat via WhatsApp",
}) {
  function handleClick() {
    const url = createWhatsAppUrl(phone, message);

    if (!url) {
      warning("Nomor WhatsApp tidak tersedia");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full transition"
    >
      <FiMessageCircle />
      {label}
    </button>
  );
}
