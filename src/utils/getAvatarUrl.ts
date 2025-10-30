export const getImageUrl = (image?: string, slug: string = 'avatar') => {
    if (!image) return '';
    return image.startsWith('https')
        ? image
        : `${import.meta.env.VITE_API_URL}/images/${slug}/${image}`;
};
