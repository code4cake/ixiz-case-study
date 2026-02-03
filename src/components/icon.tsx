interface IconsProps {
    name: string;
    className?: string;
    onClick?: () => void;
    width?: number;
    height?: number;
    viewBox?: string;
}

export function Icon({ name, className, onClick, width = 16, height = 16, viewBox = "0 0 24 24" }: IconsProps) {
    switch (name) {
        case "arrowBack":
            return (
            <svg
                name="arrowBack"
                data-testid="icon-arrowBack"
                className={className}
                onClick={onClick}
                width={width}
                height={height}
                viewBox={viewBox}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
        );
        case "share":
            return (
                <svg
                name="share"
                data-testid="icon-share"
                    className={className}
                    onClick={onClick}
                    width={width}
                    height={height}
                    viewBox={viewBox}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            );
    case "plus":
        return (
            <svg
                name="plus"
                data-testid="icon-plus"
                className={className}
                onClick={onClick}
                width={width}
                height={height}
                viewBox={viewBox}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
            );
        default:
            return null;
        }
    }