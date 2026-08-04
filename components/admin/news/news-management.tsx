"use client"

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react"
import {
  useLocale,
  useTranslations,
} from "next-intl"

import {
  FiEdit2,
  FiEye,
  FiFileText,
  FiImage,
  FiLoader,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiX,
} from "react-icons/fi"

import { useRouter } from "@/lib/i18n/navigation"

import type { BlogItem } from "@/features/admin/blog"
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "@/features/admin/blog"

type Props = {
  blogs?: BlogItem[]
  categories?: {
    id: string
    name: {
      id: string
      en: string
    }
  }[]
}

type NewsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

type NewsFormValues = {
  titleId: string
  titleEn: string
  excerptId: string
  excerptEn: string
  contentId: string
  contentEn: string
  status: NewsStatus
  categoryId: string
  coverImage: File | null
}

const initialFormValues: NewsFormValues = {
  titleId: "",
  titleEn: "",
  excerptId: "",
  excerptEn: "",
  contentId: "",
  contentEn: "",
  status: "DRAFT",
  categoryId: "",
  coverImage: null,
}

const mapBlogToForm = (
  blog: BlogItem
): NewsFormValues => ({
  titleId: blog.title.id,
  titleEn: blog.title.en,
  excerptId: blog.excerpt?.id || "",
  excerptEn: blog.excerpt?.en || "",
  contentId: blog.content.id,
  contentEn: blog.content.en,
  status: blog.status,
  categoryId: blog.categoryId || "",
  coverImage: null,
})

const appendBlogFormData = (
  formData: FormData,
  values: NewsFormValues
) => {
  formData.append("title_id", values.titleId)
  formData.append("title_en", values.titleEn)
  formData.append("excerpt_id", values.excerptId)
  formData.append("excerpt_en", values.excerptEn)
  formData.append("content_id", values.contentId)
  formData.append("content_en", values.contentEn)
  formData.append("status", values.status)
  formData.append("categoryId", values.categoryId)

  if (values.coverImage) {
    formData.append("img", values.coverImage)
  }
}

export default function NewsManagement({
  blogs = [],
  categories = [],
}: Props) {
  const t = useTranslations("admin.news")
  const router = useRouter()

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false)
  const [selectedBlog, setSelectedBlog] =
    useState<BlogItem | null>(null)
  const [modalMode, setModalMode] = useState<
    "detail" | "edit" | null
  >(null)
  const [successMessage, setSuccessMessage] =
    useState("")
  const [deleteError, setDeleteError] = useState("")
  const [deletingId, setDeletingId] = useState<
    string | null
  >(null)

  function showSuccess(message: string) {
    setSuccessMessage(message)

    window.setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  async function handleAddNews(
    values: NewsFormValues
  ) {
    const formData = new FormData()
    appendBlogFormData(formData, values)

    const response = await createBlog(formData)

    if (!response.success) {
      throw new Error(response.message)
    }

    setIsAddModalOpen(false)
    router.refresh()
    showSuccess("Berita berhasil ditambahkan.")
  }

  async function handleUpdateNews(
    values: NewsFormValues
  ) {
    if (!selectedBlog) return

    const formData = new FormData()
    appendBlogFormData(formData, values)

    const response = await updateBlog(
      selectedBlog.id,
      formData
    )

    if (!response.success) {
      throw new Error(response.message)
    }

    setSelectedBlog(null)
    setModalMode(null)
    router.refresh()
    showSuccess("Berita berhasil diperbarui.")
  }

  async function handleDeleteNews(blog: BlogItem) {
    const confirmed = window.confirm(
      `Hapus berita "${blog.title.id}"?`
    )

    if (!confirmed) return

    try {
      setDeletingId(blog.id)
      setDeleteError("")

      const response = await deleteBlog(blog.id)

      if (!response.success) {
        throw new Error(response.message)
      }

      router.refresh()
      showSuccess("Berita berhasil dihapus.")
    } catch (error) {
      console.error("Gagal menghapus berita:", error)

      setDeleteError(
        "Berita gagal dihapus. Silakan coba kembali."
      )
    } finally {
      setDeletingId(null)
    }
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

        {deleteError && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {deleteError}
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {blogs.length === 0 ? (
            <div className="p-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <FiFileText size={26} />
              </span>

              <h2 className="mt-4 font-bold text-slate-900">
                Belum ada berita
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Tambahkan berita pertama untuk mulai menampilkan konten di halaman user.
              </p>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                <FiPlus size={17} />
                Tambah berita pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">
                      Judul
                    </th>
                    <th className="px-5 py-3 font-semibold">
                      Slug
                    </th>
                    <th className="px-5 py-3 font-semibold">
                      Status
                    </th>
                    <th className="px-5 py-3 font-semibold">
                      Admin
                    </th>
                    <th className="px-5 py-3 font-semibold">
                      Dibuat
                    </th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900">
                          {blog.title.id}
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          {blog.title.en}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        /{blog.slug}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {blog.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {blog.admin?.name || "-"}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {new Date(
                          blog.createdAt
                        ).toLocaleDateString("id-ID")}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <IconButton
                            label="Detail"
                            onClick={() => {
                              setSelectedBlog(blog)
                              setModalMode("detail")
                            }}
                          >
                            <FiEye size={16} />
                          </IconButton>

                          <IconButton
                            label="Edit"
                            onClick={() => {
                              setSelectedBlog(blog)
                              setModalMode("edit")
                            }}
                          >
                            <FiEdit2 size={16} />
                          </IconButton>

                          <IconButton
                            label="Hapus"
                            onClick={() =>
                              handleDeleteNews(blog)
                            }
                            disabled={
                              deletingId === blog.id
                            }
                            tone="danger"
                          >
                            {deletingId === blog.id ? (
                              <FiLoader
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <FiTrash2 size={16} />
                            )}
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <NewsFormModal
        isOpen={isAddModalOpen}
        mode="create"
        categories={categories}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNews}
      />

      <NewsDetailModal
        blog={modalMode === "detail" ? selectedBlog : null}
        onClose={() => {
          setSelectedBlog(null)
          setModalMode(null)
        }}
        onEdit={() => setModalMode("edit")}
      />

      <NewsFormModal
        isOpen={modalMode === "edit" && !!selectedBlog}
        mode="edit"
        categories={categories}
        initialValues={
          selectedBlog
            ? mapBlogToForm(selectedBlog)
            : initialFormValues
        }
        existingImageUrl={selectedBlog?.img || ""}
        onClose={() => {
          setSelectedBlog(null)
          setModalMode(null)
        }}
        onSubmit={handleUpdateNews}
      />
    </main>
  )
}

type IconButtonProps = {
  label: string
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  tone?: "default" | "danger"
}

function IconButton({
  label,
  children,
  onClick,
  disabled = false,
  tone = "default",
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-60 ${
        tone === "danger"
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-slate-200 text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  )
}

type NewsFormModalProps = {
  isOpen: boolean
  mode: "create" | "edit"
  initialValues?: NewsFormValues
  existingImageUrl?: string
  categories?: {
    id: string
    name: {
      id: string
      en: string
    }
  }[]
  onClose: () => void
  onSubmit: (
    values: NewsFormValues
  ) => Promise<void> | void
}

function NewsFormModal({
  isOpen,
  mode,
  initialValues = initialFormValues,
  existingImageUrl = "",
  categories = [],
  onClose,
  onSubmit,
}: NewsFormModalProps) {
  const t = useTranslations("admin.news")
  const [form, setForm] =
    useState<NewsFormValues>(initialValues)
  const [previewUrl, setPreviewUrl] = useState("")
  const [coverError, setCoverError] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  useEffect(() => {
    if (isOpen) {
      setForm(initialValues)
      setCoverError("")
      setSubmitError("")
      setPreviewUrl("")
    }
  }, [initialValues, isOpen])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = "hidden"

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener(
        "keydown",
        handleEscape
      )
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!form.coverImage) {
      setPreviewUrl("")
      return
    }

    const objectUrl = URL.createObjectURL(
      form.coverImage
    )

    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [form.coverImage])

  if (!isOpen) return null

  function updateField<Key extends keyof NewsFormValues>(
    key: Key,
    value: NewsFormValues[Key]
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }))
  }

  function handleCoverChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]
    const maximumFileSize = 2 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      setCoverError(
        "Format gambar harus JPG, PNG, atau WebP."
      )

      event.target.value = ""
      return
    }

    if (file.size > maximumFileSize) {
      setCoverError("Ukuran gambar maksimal 2 MB.")

      event.target.value = ""
      return
    }

    setCoverError("")
    updateField("coverImage", file)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setSubmitError("")

      await onSubmit(form)
    } catch (error) {
      console.error("Gagal menyimpan berita:", error)

      setSubmitError(
        "Berita gagal disimpan. Silakan coba kembali."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const imagePreview = previewUrl || existingImageUrl

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex shrink-0 items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {mode === "edit"
                ? "Edit Berita"
                : t("modal.title")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("modal.description")}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
            aria-label="Tutup modal"
          >
            <FiX size={20} />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            <FormSection
              title={t("form.general.title")}
              description={t("form.general.description")}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="status" required>
                    Status
                  </FieldLabel>

                  <select
                    id="status"
                    value={form.status}
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target.value as NewsStatus
                      )
                    }
                    className={inputClassName}
                    required
                  >
                    <option value="DRAFT">
                      Draft
                    </option>
                    <option value="PUBLISHED">
                      Publikasikan
                    </option>
                    <option value="ARCHIVED">
                      Arsipkan
                    </option>
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="categoryId" required>
                    Kategori
                  </FieldLabel>

                  <select
                    id="categoryId"
                    value={form.categoryId}
                    onChange={(event) =>
                      updateField(
                        "categoryId",
                        event.target.value
                      )
                    }
                    className={inputClassName}
                    required
                  >
                    <option value="">
                      Pilih kategori
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormSection>

            <FormSection
              title="Cover Berita"
              description="Gunakan gambar JPG, PNG, atau WebP dengan ukuran maksimal 2 MB."
            >
              <label
                htmlFor={`coverImage-${mode}`}
                className="group block cursor-pointer"
              >
                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img
                      src={imagePreview}
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
                      {mode === "edit"
                        ? "Belum ada gambar tersimpan. JPG, PNG, atau WebP. Maksimal 2 MB."
                        : "JPG, PNG, atau WebP. Maksimal 2 MB."}
                    </span>
                  </div>
                )}
              </label>

              <input
                id={`coverImage-${mode}`}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleCoverChange}
                className="hidden"
              />

              {coverError && (
                <p className="mt-2 text-sm text-red-600">
                  {coverError}
                </p>
              )}
            </FormSection>

            <FormSection
              title={t("form.indonesian.title")}
              description={t(
                "form.indonesian.description"
              )}
            >
              <div className="space-y-5">
                <TextInput
                  id={`titleId-${mode}`}
                  label={t(
                    "form.indonesian.titleLabel"
                  )}
                  placeholder={t(
                    "form.indonesian.titlePlaceholder"
                  )}
                  value={form.titleId}
                  onChange={(event) =>
                    updateField(
                      "titleId",
                      event.target.value
                    )
                  }
                  required
                />

                <TextArea
                  id={`excerptId-${mode}`}
                  label="Ringkasan Berita (Indonesia)"
                  placeholder="Masukkan ringkasan berita..."
                  value={form.excerptId}
                  onChange={(event) =>
                    updateField(
                      "excerptId",
                      event.target.value
                    )
                  }
                  maxLength={300}
                  rows={3}
                />

                <TextArea
                  id={`contentId-${mode}`}
                  label="Isi Berita (Indonesia)"
                  placeholder="Masukkan isi lengkap berita..."
                  value={form.contentId}
                  onChange={(event) =>
                    updateField(
                      "contentId",
                      event.target.value
                    )
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
                  id={`titleEn-${mode}`}
                  label={t("form.english.titleLabel")}
                  placeholder={t(
                    "form.english.titlePlaceholder"
                  )}
                  value={form.titleEn}
                  onChange={(event) =>
                    updateField(
                      "titleEn",
                      event.target.value
                    )
                  }
                  required
                />

                <TextArea
                  id={`excerptEn-${mode}`}
                  label="News Summary (English)"
                  placeholder="Enter a short news summary..."
                  value={form.excerptEn}
                  onChange={(event) =>
                    updateField(
                      "excerptEn",
                      event.target.value
                    )
                  }
                  maxLength={300}
                  rows={3}
                />

                <TextArea
                  id={`contentEn-${mode}`}
                  label="News Content (English)"
                  placeholder="Enter the complete news content..."
                  value={form.contentEn}
                  onChange={(event) =>
                    updateField(
                      "contentEn",
                      event.target.value
                    )
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
              onClick={onClose}
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
                  <FiLoader
                    size={17}
                    className="animate-spin"
                  />
                  {t("form.actions.saving")}
                </>
              ) : mode === "edit" ? (
                "Simpan Perubahan"
              ) : (
                t("form.actions.save")
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

type NewsDetailModalProps = {
  blog: BlogItem | null
  onClose: () => void
  onEdit: () => void
}

function NewsDetailModal({
  blog,
  onClose,
  onEdit,
}: NewsDetailModalProps) {
  const locale = useLocale()

  useEffect(() => {
    if (!blog) return

    const previousOverflow =
      document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [blog])

  if (!blog) return null

  const publicDetailUrl = `/${locale}/news/${blog.slug}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex shrink-0 items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Detail Berita
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              /{blog.slug}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup modal"
          >
            <FiX size={20} />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {blog.img ? (
            <img
              src={blog.img}
              alt={blog.title.id}
              className="h-72 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-72 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
              <FiImage
                size={32}
                className="text-slate-400"
              />
              <p className="mt-3 text-sm font-semibold text-slate-600">
                Belum ada gambar tersimpan
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Tambahkan gambar melalui menu edit.
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <InfoBox label="Status" value={blog.status} />
            <InfoBox
              label="Admin"
              value={blog.admin?.name || "-"}
            />
            <InfoBox
              label="Dibuat"
              value={new Date(
                blog.createdAt
              ).toLocaleDateString("id-ID")}
            />
          </div>

          <DetailSection title="Bahasa Indonesia">
            <h3 className="text-lg font-bold text-slate-900">
              {blog.title.id}
            </h3>
            {blog.excerpt?.id && (
              <p className="mt-2 text-sm font-medium text-slate-600">
                {blog.excerpt.id}
              </p>
            )}
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
              {blog.content.id}
            </p>
          </DetailSection>

          <DetailSection title="English">
            <h3 className="text-lg font-bold text-slate-900">
              {blog.title.en}
            </h3>
            {blog.excerpt?.en && (
              <p className="mt-2 text-sm font-medium text-slate-600">
                {blog.excerpt.en}
              </p>
            )}
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
              {blog.content.en}
            </p>
          </DetailSection>
        </div>

        <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Tutup
          </button>

          <a
            href={publicDetailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            Lihat di halaman user
          </a>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FiEdit2 size={17} />
            Edit
          </button>
        </footer>
      </div>
    </div>
  )
}

function InfoBox({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  )
}

function DetailSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-slate-200 p-5">
      <p className="mb-3 text-xs font-semibold uppercase text-slate-400">
        {title}
      </p>
      {children}
    </section>
  )
}

const inputClassName =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"

type FieldLabelProps = {
  htmlFor: string
  children: string
  required?: boolean
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-slate-700"
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  )
}

type TextInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
  }

function TextInput({
  id,
  label,
  required,
  ...props
}: TextInputProps) {
  return (
    <div>
      <FieldLabel
        htmlFor={String(id)}
        required={required}
      >
        {label}
      </FieldLabel>

      <input
        id={id}
        required={required}
        {...props}
        className={inputClassName}
      />
    </div>
  )
}

type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string
  }

function TextArea({
  id,
  label,
  required,
  maxLength,
  value,
  ...props
}: TextAreaProps) {
  const currentLength =
    typeof value === "string" ? value.length : 0

  return (
    <div>
      <FieldLabel
        htmlFor={String(id)}
        required={required}
      >
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
  )
}

type FormSectionProps = {
  title: string
  description: string
  children: React.ReactNode
}

function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="border-b border-slate-200 pb-8 last:border-b-0">
      <h3 className="font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5">{children}</div>
    </section>
  )
}
