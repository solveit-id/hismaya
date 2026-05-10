export const normalizePhone = (
    phone: string
): string => {
    let normalized =
        phone.replace(/\D/g, "");

    if (normalized.startsWith("0")) {
        normalized =
            "62" + normalized.slice(1);
    }

    if (normalized.startsWith("620")) {
        normalized =
            "62" + normalized.slice(3);
    }

    return normalized;
};

export const isValidIndonesiaPhone = (
    phone: string
): boolean => {

    return /^62\d{8,15}$/.test(phone);
};