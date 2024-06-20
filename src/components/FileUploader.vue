<template>
    <n-upload
        directory-dnd
        :max="5"
        class="my-3"
        v-model:value="state"
        @change="() => console.log(state)"
        :custom-request="customRequest"
    >
        <n-upload-dragger>
            <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
                <archive />
            </n-icon>
            </div>
            <n-text style="font-size: 16px">
            Click or drag an image to this area to upload
            </n-text><br>
            <n-p depth="3" style="margin: 8px 0 0 0">
            Strictly prohibit from uploading sensitive information. For example,
            your bank card PIN or your credit card expiry date.
            </n-p>
        </n-upload-dragger>
    </n-upload>
</template>

<script setup>
import { NUploadDragger, NUpload, useMessage } from "naive-ui";
import { Archive } from '@vicons/ionicons5'
import axios from "axios";
import { ref } from "vue";

const props = defineProps('action')
const state = ref(null)
const message = useMessage();
const customRequest = ({
    file,
    data,
    headers,
    withCredentials,
    action,
    onFinish,
    onError,
    onProgress
}) => {
    const formData = new FormData();

    formData.append('file', file.file);
    
    axios.post('/upload/image', formData, {
            onUploadProgress: ({ percent }) => {
                onProgress({ percent: Math.ceil(percent) });
            }
        }).then(({ json }) => {
            message.success(JSON.stringify(json));
            onFinish();
        }).catch((error) => {
            message.success(error.message);
            onError();
        });
};
   
</script>
