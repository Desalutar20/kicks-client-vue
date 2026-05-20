<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import AppInput from '@/core/components/ui/AppInput.vue'
import AppSelect from '@/core/components/ui/AppSelect.vue'
import FilePicker from '@/core/components/ui/FilePicker.vue'
import FormInput from '@/core/components/ui/FormInput.vue'
import Spinner from '@/core/components/ui/Spinner.vue'
import { COLORS } from '@/core/const/colors'
import { ROUTE_NAMES } from '@/core/const/router.const'
import type {
  AdminProduct,
  AdminProductSku,
  AdminProductSkuImage,
} from '@/core/types/api/admin/admin-product.type'
import { useGetAdminProductFilterOptions } from '@/modules/admin/modules/products/composables/use-get-admin-product-filter-options'
import { useCreateUpdateProductSku } from '@/modules/admin/modules/productSkus/composables/use-create-update-product-sku'
import { useDeleteProductSku } from '@/modules/admin/modules/productSkus/composables/use-delete-product-sku'
import {
  ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH,
  ADMIN_PRODUCT_SKU_FILE_MAX_SIZE,
  ADMIN_PRODUCT_SKU_FILE_MIME_TYPES,
  ADMIN_PRODUCT_SKU_SKU_MAX_LENGTH,
} from '@/modules/admin/modules/productSkus/const/admin-product-skus-schemas.const'
import { CheckIcon, XIcon } from '@lucide/vue'
import { computed, ref, onBeforeUnmount, useAttrs } from 'vue'
import { useRouter } from 'vue-router'
import { useDeleteProductSkuImage } from '../composables/use-delete-product-sku-image'
import { toast } from 'vue-toastflow'

const { action } = defineProps<{
  action: { type: 'create'; data: AdminProduct } | { type: 'update'; data: AdminProductSku }
}>()

const attrs = useAttrs()
const router = useRouter()

const filesWithPreview = ref<
  {
    id: string
    url: string
    file: File
  }[]
>([])

const clearFiles = () => {
  if (filesWithPreview.value.length > 0) {
    for (const { url } of filesWithPreview.value) {
      URL.revokeObjectURL(url)
    }

    filesWithPreview.value = []
  }
}

const { data: filterOptions, isPending: filtersIsPending } = useGetAdminProductFilterOptions()
const { r$, isPending, noChanges, onSubmit } = useCreateUpdateProductSku(
  action.type === 'create'
    ? { type: 'create', data: action.data.id }
    : {
        type: 'update',
        data: action.data,
      },
  {
    onSuccess: clearFiles,
  },
)
const { handleDelete, isPending: deletePending } = useDeleteProductSku(action.data.id, {
  onSuccess: () => router.push({ name: ROUTE_NAMES.admin.productSkus }),
})
const { mutate: deleteImageMutate, isPending: deleteImagePending } = useDeleteProductSkuImage()

const maxFilesLength = computed(
  () =>
    ADMIN_PRODUCT_SKU_FILE_MAX_LENGTH -
    (r$.images.$value?.length ?? 0) -
    (action.type === 'create' ? 0 : action.data.images.length),
)

onBeforeUnmount(() => clearFiles())

const onFileSelect = (files: File[]) => {
  if (maxFilesLength.value === 0) return

  const sliced = files.slice(0, maxFilesLength.value)

  filesWithPreview.value = filesWithPreview.value.concat(
    sliced.map((file) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(file), file })),
  )

  r$.images.$value = [...(r$.images.$value ?? []), ...sliced]
}

const removeFile = (file: string | AdminProductSkuImage) => {
  if (typeof file === 'string') {
    const index = filesWithPreview.value.findIndex((f) => f.id === file)
    if (index === -1) return

    const [removed] = filesWithPreview.value.splice(index, 1)

    URL.revokeObjectURL(removed!.url)

    r$.images.$value = r$.images.$value?.filter((file) => file !== removed!.file) ?? []
    return
  }

  if (action.type === 'update' && action.data.images.length === 1) {
    return toast.info('Product SKU must have at least one image.')
  }

  deleteImageMutate({ id: action.data.id, imageId: file.id })
}
</script>

<template>
  <div v-if="filtersIsPending" :class="$style.loadingContainer">
    <Spinner size="xl" />
  </div>

  <form :class="[$style.form, attrs.class]">
    <fieldset :disabled="isPending || deletePending || deleteImagePending" :class="$style.fieldset">
      <div :class="$style.left">
        <label :class="$style.inputContainer">
          <span :class="$style.title">Product Title</span>
          <AppInput
            disabled
            :placeholder="action.type === 'create' ? action.data.title : action.data.product.title"
          />
        </label>

        <label :class="$style.inputContainer">
          <span :class="$style.title">Description</span>
          <AppInput
            disabled
            :placeholder="
              action.type === 'create' ? action.data.description : action.data.product.description
            "
          />
        </label>

        <label v-if="filterOptions?.data" :class="$style.inputContainer">
          <span :class="$style.title">Category</span>
          <AppInput
            disabled
            :placeholder="
              filterOptions.data.categories.find(
                (c) =>
                  c.id ===
                  (action.type === 'create'
                    ? action.data.categoryId
                    : action.data.product.categoryId),
              )?.name ??
              (action.type === 'create' ? action.data.categoryId : action.data.product.categoryId)
            "
          />
        </label>

        <label v-if="filterOptions?.data" :class="$style.inputContainer">
          <span :class="$style.title">Brand Name</span>
          <AppInput
            disabled
            :placeholder="
              filterOptions.data.brands.find(
                (c) =>
                  c.id ===
                  (action.type === 'create' ? action.data.brandId : action.data.product.brandId),
              )?.name ??
              (action.type === 'create' ? action.data.categoryId : action.data.product.categoryId)
            "
          />
        </label>

        <div :class="$style.grid">
          <label :class="$style.inputContainer">
            <span :class="$style.title">Sku</span>
            <FormInput
              :field="r$.sku"
              v-model="r$.$value.sku"
              placeholder="Sku"
              required
              :maxlength="ADMIN_PRODUCT_SKU_SKU_MAX_LENGTH"
            />
          </label>

          <label :class="$style.inputContainer">
            <span :class="$style.title">Stock Quantity </span>
            <FormInput
              :field="r$.quantity"
              v-model="r$.$value.quantity"
              placeholder="Stock quantity"
              required
            />
          </label>

          <label :class="$style.inputContainer">
            <span :class="$style.title">Price</span>
            <FormInput :field="r$.price" v-model="r$.$value.price" placeholder="Price" required />
          </label>

          <label :class="$style.inputContainer">
            <span :class="$style.title">Sale Price</span>
            <FormInput
              :field="r$.salePrice"
              v-model="r$.$value.salePrice"
              placeholder="Sale price"
            />
          </label>

          <label :class="$style.inputContainer">
            <span :class="$style.title">Color</span>
            <AppSelect
              :options="Object.entries(COLORS).map(([_, v]) => ({ label: v, value: v }))"
              placeholder="Color"
              :model-value="r$.color?.$value"
              @update:model-value="(value: string) => (r$.color.$value = value)"
            >
              <template #default="options">
                <option
                  v-for="opt in options.options"
                  :key="opt.value"
                  :value="opt.value"
                  :style="{ backgroundColor: opt.value }"
                >
                  {{ opt.label }}
                </option>
              </template>
            </AppSelect>
          </label>

          <label :class="$style.inputContainer">
            <span :class="$style.title">Size</span>
            <FormInput :field="r$.size" v-model="r$.$value.size" placeholder="Size" />
          </label>
        </div>

        <label
          v-if="
            (action.type === 'create' ? action.data.tags.length : action.data.product.tags.length) >
            0
          "
          :class="$style.inputContainer"
        >
          <span :class="$style.title">Tag</span>
          <ul :class="$style.tags">
            <li
              v-for="tag in action.type === 'create' ? action.data.tags : action.data.product.tags"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
        </label>
      </div>

      <div :class="$style.right">
        <div
          v-if="
            filesWithPreview.length > 0 ||
            (action.type === 'update' && action.data.images.length > 0)
          "
          :class="$style.imgContainer"
        >
          <img
            :src="
              filesWithPreview.at(-1)?.url ??
              (action.data as AdminProductSku).images.at(-1)?.imageUrl
            "
            :alt="
              filesWithPreview.at(-1)?.file.name ||
              (action.data as AdminProductSku).images.at(-1)?.imageName
            "
          />
        </div>

        <div :class="$style.inputContainer">
          <span :class="$style.title">Product Gallery</span>
          <FilePicker
            @change="onFileSelect"
            :accept="ADMIN_PRODUCT_SKU_FILE_MIME_TYPES.join(' ,')"
            multiple
            :maxFileSize="ADMIN_PRODUCT_SKU_FILE_MAX_SIZE"
            :maxFilesLength="maxFilesLength"
            :disabled="maxFilesLength === 0"
          />
        </div>

        <ul
          v-if="
            filesWithPreview.length > 0 ||
            (action.type === 'update' && action.data.images.length > 0)
          "
          :class="$style.imgList"
        >
          <template v-if="Object.hasOwn(action.data, 'images')">
            <li v-for="file in (action.data as AdminProductSku).images" :key="file.id">
              <img :src="file.imageUrl" :alt="file.imageName" />
              <div :class="$style.content">
                <span>{{
                  file.imageName.length > 100
                    ? file.imageName.slice(0, 100) + '...'
                    : file.imageName
                }}</span>
              </div>

              <span :class="$style.circle">
                <CheckIcon :size="16" />
              </span>

              <AppButton
                type="button"
                @click="removeFile(file)"
                :class="$style.remove"
                variant="ghost"
              >
                <XIcon :size="18" />
              </AppButton>
            </li>
          </template>

          <li v-for="file in filesWithPreview" :key="file.id">
            <img :src="file.url" :alt="file.file.name" />
            <div :class="$style.content">
              <span>{{
                file.file.name.length > 100 ? file.file.name.slice(0, 100) + '...' : file.file.name
              }}</span>
            </div>

            <span :class="$style.circle">
              <CheckIcon :size="16" />
            </span>

            <AppButton
              type="button"
              :disabled="isPending || deletePending || deleteImagePending"
              @click="removeFile(file.id)"
              :class="$style.remove"
              variant="ghost"
            >
              <XIcon :size="18" />
            </AppButton>
          </li>
        </ul>

        <div :class="$style.btns">
          <AppButton
            @click="handleDelete"
            v-if="action.type === 'update'"
            :disabled="r$.$invalid || isPending || deletePending || deleteImagePending"
            type="button"
            variant="destructive"
            >Delete</AppButton
          >
          <AppButton
            :disabled="r$.$invalid || isPending || deletePending || noChanges || deleteImagePending"
            type="button"
            @click="onSubmit"
            variant="third"
            >{{ action.type === 'create' ? 'Create' : 'Update' }}</AppButton
          >
        </div>
      </div>
    </fieldset>
  </form>
</template>

<style module>
.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 300px;
}

.form {
  padding: 24px;
  border-radius: 16px;
  background-color: var(--white);
  width: 100%;
}

.fieldset {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0;
  padding: 0;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  .title {
    font-weight: 600;
    font-size: 20px;
    font-family: var(--second-family);
    text-transform: capitalize;
  }
}

.left {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.tags {
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 14px;
  border: 1px solid var(--dark-gray);
  border-radius: 8px;
  padding: 16px;
  min-height: 100px;

  li {
    border-radius: 20px;
    padding: 4px 12px;
    background: #36323b;
    font-family: var(--third-family);
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.02em;
    color: #e9e9ea;
  }
}

.right {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.imgContainer {
  border-radius: 16px;
  padding: 8px;
  height: 444px;
  background-color: var(--fa-white);

  img {
    height: 100%;
    border-radius: 8px;
  }
}

.imgList {
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  li {
    width: 100%;
    border-radius: 8px;
    padding: 16px;
    background-color: var(--fa-white);
    display: flex;
    align-items: center;
    column-gap: 16px;
    position: relative;

    .remove {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #999 !important;
    }

    .remove:hover {
      color: red !important;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 8px;
    }

    div.content {
      display: flex;
      flex-direction: column;
      row-gap: 16px;

      span {
        font-weight: 600;
        font-family: var(--second-family);
      }
    }

    span.circle {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 26px;
      height: 26px;
      margin-left: auto;
      background-color: var(--blue);
      border-radius: 100%;
      font-weight: 600;
    }
  }
}

.btns {
  margin-left: auto;
  width: fit-content;
  display: flex;
  align-items: center;
  column-gap: 16px;

  button {
    width: 150px;
  }
}

@media (min-width: 900px) {
  .fieldset {
    flex-direction: row;
  }

  .left {
    width: 50%;
  }

  .right {
    width: 50%;
  }
}
</style>
