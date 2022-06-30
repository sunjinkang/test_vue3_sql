<template>
    <section class="login-page">
      <div class="login-page-form-wrapper">
        <div class="login-page-powered">
          <img src="../../assets/logo.png" alt="" />
          Action SQLe
        </div>
        <div class="login-title">SQL审核平台</div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
          <el-form-item
            prop="username"
            label-width="0"
          >
            <el-input v-model="loginForm.username" placeholder="用户名" autofocus />
          </el-form-item>
          <el-form-item
            prop="password"
            label-width="0"
          >
            <el-input v-model="loginForm.password" type="password" placeholder="密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login(loginFormRef)">
                登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
</template>
<script lang="ts">
import {
    defineComponent,
    reactive,
    ref,
} from 'vue';
import type { ElForm } from 'element-plus';
import { useRouter } from 'vue-router';
import user from '../../api/user';
import { useUserStore } from '../../store/user';
export default defineComponent({
    setup() {
        type FormInstance = InstanceType<typeof ElForm>;
        const loginFormRef = ref<FormInstance>();
        const loginForm = reactive({
            username: '',
            password: '',
        });

        const rules = reactive({
            username: [
                {
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur',
                }
            ],
            password: [
                {
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur',
                }
            ],
        });

        const userStore = useUserStore();

        const router = useRouter();

        const login = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                console.log(valid);
                if (valid) {
                    user.loginV1({
                        username: loginForm.username,
                        password: loginForm.password,
                    })
                    .then((res: any) => {
                        if (res.data.code === 0) {
                            userStore.updateToken(res.data.data?.token ?? '');
                            userStore.updateUser({ username: loginForm.username, role: ''});
                            router.push('/platform/user');
                        }
                    });
                }
            })
        }

        return {
            loginFormRef,
            loginForm,
            rules,
            login,
        }
    }
});
</script>
<style lang="less">
.login-page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #303269;
}
.login-page-form-wrapper {
    width: 300px;
    height: 255px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px;
    .login-title {
        margin: 10px 0;
        font-size: 20px;
    }
    .login-page-powered {
        height: 20px;
        font-size: 12px;
        text-align: left;
        img {
            width: 15px;
            height: 15px;
        }
    }
    .el-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-form-item {
            margin-bottom: 24px;
            width: 100%;
            .el-input input {
                width: 100%;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                font-size: 14px;
                padding: 4px 11px;
                height: 24px;
            }
            button.el-button {
                width: 100%;
            }
        }
    }
}
</style>