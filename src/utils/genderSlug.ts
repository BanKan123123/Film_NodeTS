export default async function genderSlug(data: string) {
    try {
        return data
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 30);
    } catch (err) {
        console.log(err);
        return '';
    }
}
