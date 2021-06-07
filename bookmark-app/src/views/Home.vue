<template>
    <div class="home container">
        <div class="row mb-3">
            <div class="home-nav d-flex justify-content-start">
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="getData"
                    ref="btnModal"
                >
                    <!--  @click="getData" -->
                    Created
                </button>
                <Modal
                    :titleModal="titleModal"
                    :func="func"
                    @update-data="updateBookmark"
                    :id="id"
                    :item="item"
                >
                </Modal>
            </div>
        </div>
        <div class="row">
            <div class="home-list">
                <ul class="list-group ml-5 mr-5">
                    <li
                        class="
                            list-group-item
                            d-flex
                            justify-content-between
                            align-items-center
                        "
                        v-for="(item, index) in dataBookMark"
                        v-bind:key="index"
                    >
                        <div class="list-content">
                            <img
                                class="content__img"
                                :src="item.logo"
                                alt="bg"
                                width="25"
                            />
                            <a
                                :href="item.url"
                                class="content__title"
                                target="_blank"
                                >{{ item.title }}</a
                            >
                        </div>
                        <div class="list-dot">
                            <div class="btn-group dropstart">
                                <button
                                    type="button"
                                    class="btn dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <span
                                            class="dropdown-item"
                                            href="#"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click="onClickEdit(item)"
                                            >Edit</span
                                        >
                                    </li>
                                    <li>
                                        <span
                                            class="dropdown-item"
                                            href="#"
                                            @click="onClickDelete(item)"
                                            >Delete</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
    name: "Home",
    components: { Modal },
    data() {
        return {
            dataBookMark: [],
            titleModal: "'",
            func: "",
            id: "",
            item: {},
        };
    },
    methods: {
        getData() {
            this.titleModal = "Add bookmark";
            this.func = "add";
            document.getElementById("resetdata").click;
        },
        onClickEdit(item) {
            this.titleModal = "Edit bookmark";
            this.func = "edit";
            this.item = item;

            localStorage.setItem("item", JSON.stringify(item));
            document.getElementById("editdata").click();
            // this.$refs.btnModal.click();
        },
        arrayRemove(arr, value) {
            return arr.filter(function (ele) {
                return ele != value;
            });
        },

        onClickDelete(item) {
            let dataBookMarkNew = JSON.parse(
                localStorage.getItem("dataBookMark")
            );
            for (var i = 0; i < dataBookMarkNew.length; i++) {
                if (dataBookMarkNew[i].id === item.id) {
                    dataBookMarkNew.splice(i, 1);
                }
            }
            localStorage.setItem(
                "dataBookMark",
                JSON.stringify(dataBookMarkNew)
            );
            this.dataBookMark = JSON.parse(
                localStorage.getItem("dataBookMark")
            );
        },
        updateBookmark(data) {
            this.dataBookMark = [...data];
        },
    },
    created() {
        this.dataBookMark = JSON.parse(localStorage.getItem("dataBookMark"));
    },
};
</script>
<style lang='scss' scoped>
a {
    text-decoration: none;
}
.content__title {
    margin-left: 25px;
    color: rgb(141, 141, 143);
}
.content__img {
    float: left;
}
.dropstart .dropdown-toggle::before {
    display: none;
}

.btn-check:focus + .btn,
.btn:focus {
    outline: 0;
    box-shadow: none;
}
</style>
