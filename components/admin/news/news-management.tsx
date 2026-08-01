"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import {
  FiFileText,
  FiImage,
  FiLoader,
  FiPlus,
  FiUpload,
  FiX,
} from "react-icons/fi";

type NewsStatus = "draft" | "published";

type NewsFormValues = {
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  categoryId: string;
  author: string;
  publishedAt: string;
  status: NewsStatus;
  coverImage: File | null;
};

const initialFormValues: NewsFormValues = {
  titleId: "",
  titleEn: "",
  excerptId: "",
  excerptEn: "",
  contentId: "",
  contentEn: "",
  categoryId: "",
  author: "",
  publishedAt: "",
  status: "draft",
  coverImage: null,
};

const categories = [
  {
    id: "1",
    name: "Sertifikasi Halal",
  },
  {
    id: "2",
    name: "ISO",
  },
  {
    id: "3",
    name: "Pelatihan",
  },
  {
    id: "4",
    name: "Kegiatan",
  },
];

export default function NewsManagement() {
  const t = useTranslations("admin.news");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  async function handleAddNews(values: NewsFormValues) {
    /*
     * FRONTEND ONLY
     *
     * Untuk sementara data hanya ditampilkan
     * melalui console browser.
     */
    console.log("Data berita siap dikirim:", values);

    /*
     * FormData disiapkan karena form memiliki
     * file cover.
     */
    const formData = new FormData();

    formData.append("title_id", values.titleId);
    formData.append("title_en", values.titleEn);

    formData.append("excerpt_id", values.excerptId);

    formData.append("excerpt_en", values.excerptEn);

    formData.append("content_id", values.contentId);

    formData.append("content_en", values.contentEn);

    formData.append("category_id", values.categoryId);

    formData.append("author", values.author);

    formData.append("published_at", values.publishedAt);

    formData.append("status", values.status);

    if (values.coverImage) {
      formData.append("cover_image", values.coverImage);
    }

    /*
     * Aktifkan bagian ini setelah endpoint
     * backend sudah tersedia.
     */

    /*
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/news`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(
        "Gagal menambahkan berita",
      );
    }
    */

    setIsAddModalOpen(false);

    setSuccessMessage("Berita berhasil disiapkan.");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {t("page.title")}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {t("page.description")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FiPlus size={18} />
            {t("page.addButton")}
          </button>
        </header>

        {successMessage && (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {successMessage}
          </div>
        )}

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiFileText size={26} />
          </span>

          <h2 className="mt-4 font-bold text-slate-900">
            Data berita akan ditampilkan di sini
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Setelah API backend tersedia, bagian ini dapat diganti dengan tabel
            daftar berita, status publikasi, dan tombol edit atau hapus.
          </p>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <FiPlus size={17} />
            Tambah berita pertama
          </button>
        </section>
      </div>

      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNews}
      />
    </main>
  );
}

type AddNewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewsFormValues) => Promise<void> | void;
};

function AddNewsModal({ isOpen, onClose, onSubmit }: AddNewsModalProps) {
  const t = useTranslations("admin.news");
  const [form, setForm] = useState<NewsFormValues>(initialFormValues);

  const [previewUrl, setPreviewUrl] = useState("");

  const [coverError, setCoverError] = useState("");

  const [submitError, setSubmitError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!form.coverImage) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(form.coverImage);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [form.coverImage]);

  if (!isOpen) {
    return null;
  }

  function updateField<Key extends keyof NewsFormValues>(
    key: Key,
    value: NewsFormValues[Key],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const maximumFileSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setCoverError("Format gambar harus JPG, PNG, atau WebP.");

      event.target.value = "";
      return;
    }

    if (file.size > maximumFileSize) {
      setCoverError("Ukuran gambar maksimal 2 MB.");

      event.target.value = "";
      return;
    }

    setCoverError("");

    updateField("coverImage", file);
  }

  function resetForm() {
    setForm(initialFormValues);
    setCoverError("");
    setSubmitError("");
    setPreviewUrl("");
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.coverImage) {
      setCoverError("Cover berita wajib ditambahkan.");

      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      await onSubmit(form);

      resetForm();
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);

      setSubmitError("Berita gagal disimpan. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-news-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex shrink-0 items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2
              id="add-news-title"
              className="text-xl font-bold text-slate-900"
            >
              {t("modal.title")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("modal.description")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
            aria-label="Tutup modal"
          >
            <FiX size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            <FormSection
              title={t("form.general.title")}
              description={t("form.general.description")}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="categoryId" required>
                    {t("form.general.categoryLabel")}
                  </FieldLabel>

                  <select
                    id="categoryId"
                    value={form.categoryId}
                    onChange={(event) =>
                      updateField("categoryId", event.target.value)
                    }
                    required
                    className={inputClassName}
                  >
                    <option value="">
                      {t("form.general.categoryPlaceholder")}
                    </option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <TextInput
                  id="author"
                  label={t("form.general.authorLabel")}
                  placeholder={t("form.general.authorPlaceholder")}
                  value={form.author}
                  onChange={(event) =>
                    updateField("author", event.target.value)
                  }
                  required
                />

                <TextInput
                  id="publishedAt"
                  label="Tanggal Publikasi"
                  type="date"
                  value={form.publishedAt}
                  onChange={(event) =>
                    updateField("publishedAt", event.target.value)
                  }
                  required
                />

                <div>
                  <FieldLabel htmlFor="status" required>
                    Status
                  </FieldLabel>

                  <select
                    id="status"
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value as NewsStatus)
                    }
                    className={inputClassName}
                    required
                  >
                    <option value="draft">Draft</option>

                    <option value="published">Publikasikan</option>
                  </select>
                </div>
              </div>
            </FormSection>

            <FormSection
              title="Cover Berita"
              description="Gunakan gambar JPG, PNG, atau WebP dengan ukuran maksimal 2 MB."
            >
              <label
                htmlFor="coverImage"
                className="group block cursor-pointer"
              >
                {previewUrl ? (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img
                      src={previewUrl}
                      alt="Preview cover berita"
                      className="h-64 w-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition group-hover:bg-slate-950/40">
                      <span className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 opacity-0 shadow-lg transition group-hover:opacity-100">
                        <FiUpload size={17} />
                        Ganti gambar
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition group-hover:border-blue-500 group-hover:bg-blue-50">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FiImage size={24} />
                    </span>

                    <span className="mt-3 text-sm font-semibold text-slate-700">
                      Pilih cover berita
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      JPG, PNG, atau WebP. Maksimal 2 MB.
                    </span>
                  </div>
                )}
              </label>

              <input
                id="coverImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleCoverChange}
                className="hidden"
              />

              {coverError && (
                <p className="mt-2 text-sm text-red-600">{coverError}</p>
              )}
            </FormSection>

            <FormSection
              title={t("form.indonesian.title")}
              description={t("form.indonesian.description")}
            >
              <div className="space-y-5">
                <TextInput
                  id="titleId"
                  label={t("form.indonesian.titleLabel")}
                  placeholder={t("form.indonesian.titlePlaceholder")}
                  value={form.titleId}
                  onChange={(event) =>
                    updateField("titleId", event.target.value)
                  }
                  required
                />

                <TextArea
                  id="excerptId"
                  label="Ringkasan Berita (Indonesia)"
                  placeholder="Masukkan ringkasan berita..."
                  value={form.excerptId}
                  onChange={(event) =>
                    updateField("excerptId", event.target.value)
                  }
                  maxLength={300}
                  rows={3}
                  required
                />

                <TextArea
                  id="contentId"
                  label="Isi Berita (Indonesia)"
                  placeholder="Masukkan isi lengkap berita..."
                  value={form.contentId}
                  onChange={(event) =>
                    updateField("contentId", event.target.value)
                  }
                  rows={9}
                  required
                />
              </div>
            </FormSection>

            <FormSection
              title={t("form.english.title")}
              description={t("form.english.description")}
            >
              <div className="space-y-5">
                <TextInput
                  id="titleEn"
                  label={t("form.english.titleLabel")}
                  placeholder={t("form.english.titlePlaceholder")}
                  value={form.titleEn}
                  onChange={(event) =>
                    updateField("titleEn", event.target.value)
                  }
                  required
                />

                <TextArea
                  id="excerptEn"
                  label="News Summary (English)"
                  placeholder="Enter a short news summary..."
                  value={form.excerptEn}
                  onChange={(event) =>
                    updateField("excerptEn", event.target.value)
                  }
                  maxLength={300}
                  rows={3}
                  required
                />

                <TextArea
                  id="contentEn"
                  label="News Content (English)"
                  placeholder="Enter the complete news content..."
                  value={form.contentEn}
                  onChange={(event) =>
                    updateField("contentEn", event.target.value)
                  }
                  rows={9}
                  required
                />
              </div>
            </FormSection>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
          </div>

          <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("form.actions.cancel")}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <>
                  <FiLoader size={17} className="animate-spin" />
                  {t("form.actions.saving")}
                </>
              ) : (
                t("form.actions.save")
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

const inputClassName =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

type FieldLabelProps = {
  htmlFor: string;
  children: string;
  required?: boolean;
};

function FieldLabel({ htmlFor, children, required = false }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-slate-700"
    >
      {children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function TextInput({ id, label, required, ...props }: TextInputProps) {
  return (
    <div>
      <FieldLabel htmlFor={String(id)} required={required}>
        {label}
      </FieldLabel>

      <input
        id={id}
        required={required}
        {...props}
        className={inputClassName}
      />
    </div>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function TextArea({
  id,
  label,
  required,
  maxLength,
  value,
  ...props
}: TextAreaProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div>
      <FieldLabel htmlFor={String(id)} required={required}>
        {label}
      </FieldLabel>

      <textarea
        id={id}
        required={required}
        maxLength={maxLength}
        value={value}
        {...props}
        className="w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

      {maxLength && (
        <p className="mt-1 text-right text-xs text-slate-400">
          {currentLength}/{maxLength}
        </p>
      )}
    </div>
  );
}

type FormSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="border-b border-slate-200 pb-8 last:border-b-0">
      <h3 className="font-bold text-slate-900">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>

      <div className="mt-5">{children}</div>
    </section>
  );
}
