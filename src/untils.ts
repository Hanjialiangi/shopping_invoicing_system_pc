/**
 * 工具函数
 */

/**上传图片 */
export function getBase64(img: Blob, callback: (arg0: string | ArrayBuffer | null) => any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}