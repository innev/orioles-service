const extname = (filename: string): string => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
        // 如果没有找到扩展名，直接返回原始文件名
        return filename;
    }
    return filename.slice(0, lastDotIndex);
};

export default {
    extname
};