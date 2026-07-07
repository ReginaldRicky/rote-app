import { FiImage, FiUploadCloud } from "react-icons/fi";

export default function PackageImageSection({ formData, updateField }) {
  const previewImage = formData.previewImage || formData.thumbnail || formData.image;

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      updateField("imageFile", null);
      updateField("previewImage", formData.thumbnail || formData.image || "");
      return;
    }

    updateField("imageFile", file);
    updateField("previewImage", URL.createObjectURL(file));
  }

  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <div className="rounded-[18px] border border-[#edf1f6] bg-[#f8fafc] p-4">
        <div className="mb-4">
          <h3 className="text-[15px] font-extrabold text-[#111827]">Package Image</h3>
          <p className="mt-1 text-[12px] text-[#94a3b8]">
            Upload package image from your device. URL thumbnail is no longer required.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white">
            {previewImage ? (
              <img src={previewImage} alt={formData.title || "Package preview"} className="h-[210px] w-full object-cover" />
            ) : (
              <div className="flex h-[210px] items-center justify-center text-[#94a3b8]">
                <FiImage size={30} />
              </div>
            )}
          </div>

          <label className="flex min-h-[210px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#dbe4ef] bg-white p-6 text-center transition hover:border-[#AAB700]">
            <FiUploadCloud size={34} className="text-[#AAB700]" />
            <p className="mt-3 text-[14px] font-extrabold text-[#111827]">Click to upload image</p>
            <p className="mt-1 text-[12px] leading-5 text-[#94a3b8]">JPG, PNG, WEBP. Maksimal 2MB.</p>
            <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>
    </section>
  );
}
