

<template>
    <div>
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <button hidden id="editdata" @click="setData"></button>
            <button hidden id="resetdata" @click="reset"></button>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ titleModal }}
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            @click="reset"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="actionLogin">
                            <div class="mb-3">
                                <label for="Name" class="form-label float-start"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    aria-describedby="Name"
                                    v-model="inputName"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="Url" class="form-label float-start"
                                    >Url</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Url"
                                    v-model="inputUrl"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button "
                            id="close"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            @click="reset"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="getApiDataMeta"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { uuid } from "vue-uuid";
export default {
    name: "Modal",
    props: ["titleModal", "func", "item"],
    emits: ["update-data"],
    components: {},
    data() {
        return {
            inputName: "",
            inputUrl: "",
            flagModal: "",
            // changedata: {},
        };
    },
    methods: {
        async getApiDataMeta() {
            //https://poeta-serverless.vercel.app/api/get-meta?url=https://poetadigital.com
            if (this.func === "add") {
                await axios
                    .get(
                        `https://poeta-serverless.vercel.app/api/get-meta?url=${this.inputUrl}`
                    )
                    .then((result) => {
                        console.log(result.data.data.meta.site);
                        if (result.data) {
                            let modalEx = document.getElementById("close");
                            let dataBookMark = JSON.parse(
                                localStorage.getItem("dataBookMark")
                            );

                            if (dataBookMark) {
                                dataBookMark.push({
                                    id: uuid.v1(),
                                    url: result.data.data.meta.site.canonical,
                                    logo: result.data.data.meta.site.logo,
                                    name: this.inputName,
                                    title: result.data.data.meta.title,
                                });
                                localStorage.setItem(
                                    "dataBookMark",
                                    JSON.stringify(dataBookMark)
                                );
                            } else {
                                let dataNew = [
                                    {
                                        id: uuid.v1(),
                                        url: result.data.data.meta.site
                                            .canonical,
                                        logo: result.data.data.meta.site.logo,
                                        name: this.inputName,
                                        title: result.data.data.meta.title,
                                    },
                                ];
                                localStorage.setItem(
                                    "dataBookMark",
                                    JSON.stringify(dataNew)
                                );
                            }
                            let data = JSON.parse(
                                localStorage.getItem("dataBookMark")
                            );
                            this.$emit("update-data", data);

                            modalEx.click();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else if (this.func === "edit") {
                let iddata = this.item.id;
                let data = JSON.parse(localStorage.getItem("dataBookMark"));
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === iddata) {
                        console.log(data[i].id === iddata);
                        console.log("vi tri", data[i]);
                        await axios
                            .get(
                                `https://poeta-serverless.vercel.app/api/get-meta?url=${this.inputUrl}`
                            )
                            .then((result) => {
                                data[i].url =
                                    result.data.data.meta.site.canonical;
                                data[i].logo = result.data.data.meta.site.logo;
                                data[i].name = this.inputName;
                                data[i].title = result.data.data.meta.title;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        localStorage.setItem(
                            "dataBookMark",
                            JSON.stringify(data)
                        );

                        this.$emit(
                            "update-data",
                            JSON.parse(localStorage.getItem("dataBookMark"))
                        );
                        let modalEx = document.getElementById("close");
                        modalEx.click();
                        break;
                    }
                }
            }
        },
        reset() {
            this.inputName = "";
            this.inputUrl = "";
        },
        setData() {
            let data = JSON.parse(localStorage.getItem("item"));
            this.inputName = data.name;
            this.inputUrl = data.url;
        },
    },
};
</script>
<style lang='scss' scoped>
</style>