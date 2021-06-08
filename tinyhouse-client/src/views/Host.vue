<template>
  <a-layout-content class="host-content">
    <div
      v-if="!viewer.hasWallet"
      class="host__form-header"
    >
      <a-typography-title
        :level="3"
        class="host__form-title"
      >
        You'll have to be signed in and connected with Stripe to host a
        listing!
      </a-typography-title>
      <a-typography-text type="secondary">
        We only allow users who've signed in to our application and have
        connected with Stripe to host new listings. You can sign in at the
        <router-link to="/login">
          login
        </router-link> page and connect with Stripe shortly
        after.
      </a-typography-text>
    </div>
    <div
      v-if="loading"
      class="host__form-header"
    >
      <a-typography-title
        :level="3"
        class="host__form-title"
      >
        Please wait!
      </a-typography-title>
      <a-typography-text type="secondary">
        We're creating your listing now.
      </a-typography-text>
    </div>
    <a-form
      v-if="viewer.hasWallet"
      :rules="rules"
      layout="vertical"
      :model="formState"
      @finish="finish"
    >
      <div class="host__form-header">
        <a-typography-title
          :level="3"
          class="host__form-title"
        >
          Hi! Let's get started listing your place.
        </a-typography-title>
        <a-typography-text type="secondary">
          In this form, we'll collect some basic and additional information
          about your listing.
        </a-typography-text>
      </div>

      <a-form-item
        label="Home Type"
        name="type"
      >
        <a-radio-group v-model:value="formState.type">
          <a-radio-button :value="ListingType.APARTMENT">
            <BankOutlined :style="{color: iconColor}" />
            <span>&nbsp;Apartment</span>
          </a-radio-button>
          <a-radio-button :value="ListingType.HOUSE">
            <HomeOutlined :style="{color: iconColor}" />
            <span>&nbsp;House</span>
          </a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="Max # of Guests"
        name="numOfGuests"
      >
        <a-input-number
          v-model:value="formState.numOfGuests"
          :min="1"
          placeholder="4"
        />
      </a-form-item>

      <a-form-item
        name="title"
        label="Title"
        extra="Max character count of 45"
      >
        <a-input
          v-model:value="formState.title"
          :max-length="45"
          placeholder="The iconic and luxurious Bel-Air mansion"
        />
      </a-form-item>

      <a-form-item
        label="Description"
        extra="Max character count of 400"
        name="description"
      >
        <a-textarea
          v-model:value="formState.description"
          :rows="3"
          :max-length="400"
          placeholder="Modern, clean and iconic home of the Fresh Prince. Situated in the heart of Bel-Air, Los Angeles."
        />
      </a-form-item>
      <a-form-item
        name="address"
        label="Address"
      >
        <a-input
          v-model:value="formState.address"
          placeholder="251 North Bristol Avenue"
          auto-complete="street-address"
        />
      </a-form-item>

      <a-form-item
        name="city"
        label="City/Town"
      >
        <a-input
          v-model:value="formState.city"
          placeholder="Los Angeles"
          auto-complete="address-level2"
        />
      </a-form-item>

      <a-form-item
        name="state"
        label="State/Province"
      >
        <a-input
          v-model:value="formState.state"
          placeholder="California"
          auto-complete="address-level1"
        />
      </a-form-item>

      <a-form-item
        name="zip"
        label="Zip/Postal Code"
      >
        <a-input
          v-model:value="formState.zip"
          placeholder="Please enter a zip code for your listing!"
          auto-complete="postal-code"
        />
      </a-form-item>

      <a-form-item
        name="image"
        label="Image"
        extra="Images have to be under 2MB in size and of type JPG or PNG"
      >
        <div class="host__form-image-upload">
          <a-upload
            v-model:file-list="formState.image"
            name="image"
            list-type="picture-card"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeImageUpload"
            @change="handleImageUpload"
          >
            <img
              v-if="imageBase64Value"
              :src="imageBase64Value"
              alt="listing"
            >
            <div v-else>
              <LoadingOutlined v-if="imageLoading" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </div>
      </a-form-item>

      <a-form-item
        name="price"
        label="Price"
        extra="All prices in $USD/day"
      >
        <a-input-number
          v-model:value="formState.price"
          :min="0"
          placeholder="120"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </a-layout-content>
</template>

<script lang="ts">
import {
  BankOutlined,
  HomeOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ListingType } from '@/lib/graphql/globalTypes'
import { viewer } from '@/store/viewer'
import { iconColor } from '@/utils'
import { useMutation } from '@vue/apollo-composable'
import { HOST_LISTING } from '@/lib/graphql'
import { displaySuccessNotification, displayErrorMessage } from '@/utils'

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  type?: string
  size: number
  originFileObj: any
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export default defineComponent({
  name: 'PageHost',
  components: { BankOutlined, HomeOutlined, PlusOutlined, LoadingOutlined },
  setup() {
    const rules = {
      type: [
        {
          required: true,
          message: 'Please select a home type!',
          trigger: 'change',
        },
      ],
      numOfGuests: [
        {
          required: true,
          message: 'Please enter the max number of guests!',
          type: 'number',
        },
      ],
      title: [
        { required: true, message: 'Please enter a title for your listing!' },
      ],
      description: [
        {
          required: true,
          message: 'Please enter a description for your listing!',
        },
      ],
      address: [
        {
          required: true,
          message: 'Please enter an address for your listing!',
        },
      ],
      city: [
        {
          required: true,
          message: 'Please enter a city (or region) for your listing!',
        },
      ],
      state: [
        {
          required: true,
          message: 'Please enter a state (or province) for your listing!',
        },
      ],
      zip: [
        {
          required: true,
          message: 'Please enter a zip (or postal) code for your listing!',
        },
      ],
      image: [
        {
          required: true,
          message: 'Please provide an image for your listing!',
          type: 'array',
          trigger: "['change', 'blur']",
        },
      ],
      price: [
        {
          required: true,
          message: 'Please enter a price for your listing!',
          type: 'number',
        },
      ],
    }
    // handle image upload
    const imageLoading = ref<boolean>(false)
    const imageBase64Value = ref<string>('')

    function handleImageUpload(info: FileInfo) {
      if (info.file.status === 'uploading') {
        imageLoading.value = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageBase64Value.value = base64Url
          imageLoading.value = false
        })
      }
      if (info.file.status === 'error') {
        imageBase64Value.value = false
        displayErrorMessage('upload error')
      }
    }

    const beforeImageUpload = (file: FileItem) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        displayErrorMessage('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        displayErrorMessage('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
    // submit form
    const {
      mutate: hostListing,
      onDone,
      onError,
      loading,
    } = useMutation(HOST_LISTING)

    const router = useRouter()
    onDone((result) => {
      displaySuccessNotification("You've successfully created your listing!")
      router.push(`/listing/${result.data.hostListing.id}`)
    })

    onError(() => {
      displayErrorMessage(
        "Sorry! We were'nt able to create your listing. Please try again later."
      )
    })

    function finish(values) {
      console.log('finish', values, imageBase64Value.value)

      const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.zip}`
      const input = {
        ...values,
        address: fullAddress,
        image: imageBase64Value.value,
        price: values.price * 100,
      }

      delete input.city
      delete input.state
      delete input.zip

      hostListing({
        input,
      })
    }

    const formState = reactive({
      type: '',
      numOfGuests: 1,
      title: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      image: [],
      price: '',
    })

    return {
      formState,
      rules,
      finish,
      ListingType,
      viewer,
      iconColor,
      loading,
      imageLoading,
      imageBase64Value,
      handleImageUpload,
      beforeImageUpload,
    }
  },
})
</script>
