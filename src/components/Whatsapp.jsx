// components/WhatsAppFloat.jsx

export default function WhatsApp({ whatsapp = "971558758934" }) {
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Hi!%20I'm%20interested%20in%20your%20services`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[var(--dxb-pink)] shadow-xl hover:scale-110 transition
      "
    >
      {/* Glow ring */}
      <span
        className="
          absolute w-full h-full rounded-full
          border-2 border-[var(--dxb-pink)] opacity-60
          animate-ping
        "
      ></span>

      {/* WhatsApp Icon (white) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        width="26"
        height="26"
        className="relative z-10"
      >
        <path d="M16.001 3.2c-7.065 0-12.8 5.735-12.8 12.8 0 2.256.589 4.438 1.718 6.356L3.2 28.8l6.635-1.706A12.726 12.726 0 0 0 16.001 28.8c7.065 0 12.8-5.735 12.8-12.8s-5.735-12.8-12.8-12.8Zm0 23.467a10.6 10.6 0 0 1-5.387-1.48l-.386-.229-3.94 1.013 1.047-3.837-.251-.394a10.56 10.56 0 1 1 8.917 4.927Zm6.08-7.947c-.331-.165-1.954-.964-2.256-1.075-.301-.112-.52-.165-.739.165-.218.331-.848 1.075-1.04 1.29-.19.218-.385.24-.716.082-.33-.165-1.39-.513-2.646-1.635-.978-.873-1.635-1.954-1.825-2.285-.19-.33-.02-.508.144-.673.15-.149.331-.385.496-.58.165-.196.218-.33.331-.55.113-.218.056-.413-.028-.58-.83-1.65-.739-1.782-1.012-2.445-.265-.636-.533-.55-.739-.561l-.631-.012c-.218 0-.57.082-.868.385-.297.331-1.14 1.112-1.14 2.707 0 1.595 1.168 3.135 1.331 3.353.165.218 2.298 3.51 5.563 4.92.778.336 1.384.538 1.856.688.78.248 1.49.213 2.053.129.626-.093 1.954-.798 2.229-1.568.278-.77.278-1.435.196-1.569-.082-.132-.301-.218-.632-.381Z" />
      </svg>
    </a>
  );
}
