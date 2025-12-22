export const CSS_VARS = `
    /* Khung chứa SVG */
    .reveal-container { 
        width: 6rem; 
        height: 6rem; 
        margin: 0 auto; 
    }

    /* Các đường vẽ SVG */
    .logo-path {
        fill: none;
        stroke: #3f3f46; /* zinc-700 */
        stroke-width: 4px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 200; 
        stroke-dashoffset: 200;
        opacity: 0;
        transform-origin: 50% 50%; 
        animation: draw-and-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* Áp dụng màu và delay cho từng phần của logo (QUAY LẠI MÀU ĐỎ/AMBER) */
    .logo-path:nth-child(1) { stroke: #f59e0b; animation-delay: 0s; } /* amber-500 */
    .logo-path:nth-child(2) { stroke: #3f3f46; animation-delay: 0.15s; } /* zinc-700 */
    .logo-path:nth-child(3) { stroke: #f59e0b; animation-delay: 0.3s; } /* amber-500 */

    /* Keyframes cho hiệu ứng vẽ và tiết lộ */
    @keyframes draw-and-reveal {
        /* 0% - 30%: Vẽ đường (Drawing) */
        0% { stroke-dashoffset: 200; opacity: 1; transform: none; }
        30% { stroke-dashoffset: 0; opacity: 1; transform: none; }
        
        /* 30% - 60%: Giữ nguyên (Holding) */
        60% { stroke-dashoffset: 0; opacity: 1; transform: none; }

        /* 60% - 80%: Tiết lộ (Shift and Fade out) */
        70% { transform: translateY(-5px) scale(1.05); opacity: 0.8; }
        80% { transform: translateY(10px) scale(0.0); opacity: 0; }

        /* 80% - 100%: Thiết lập lại (Resetting) */
        100% { stroke-dashoffset: 200; opacity: 0; transform: none; }
    }
    
    /* Keyframes cho hiệu ứng mờ dần */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }

    /* Keyframes cho hiệu ứng Scroll Reveal */
    @keyframes slide-up-fade-in {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .scroll-reveal {
        opacity: 0;
    }
    .animate-reveal {
        opacity: 0;
        animation: slide-up-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    /* NEW: CSS cho Hero Slider Transition */
    .slide-content-transition {
        /* Dùng key trong React để trigger component change, kết hợp với Tailwind classes */
        opacity: 0;
        animation: slide-up-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    /* NEW: CSS cho Button Ripple Effect */
    .ripple-button {
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0); /* Force GPU acceleration */
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      background-color: rgba(255, 255, 255, 0.7); /* White ripple on dark/blue backgrounds */
    }
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
`;