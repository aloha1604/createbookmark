
<template>
    <div>
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
                    <span class="dropdown-item" href="#" @click="onClickEdit"
                        >Edit</span
                    >
                </li>
                <li><span class="dropdown-item" href="#">Delete</span></li>
            </ul>

            <Modal
                :titleModal="'Edit bookmark'"
                :func="'edit'"
                ref="editID"
                id="editID"
                :nameBtn="'Edit'"
            ></Modal>
        </div>
    </div>
</template>

<script>
import Modal from "../components/Modal.vue";
export default {
    name: "BtnGroupDot",
    components: { Modal },
    methods: {
        onClickEdit() {
            this.$refs.editID.click();
            console.log(this.$refs.editID);
        },
        onClickDelete() {
            // let dataBookMark = JSON.parse(localStorage.getItem("dataBookMark"));
            // dataBookMark;
        },
    },
};
</script>
<style lang='scss' scoped>
.dropstart .dropdown-toggle::before {
    display: none;
}

.btn-check:focus + .btn,
.btn:focus {
    outline: 0;
    box-shadow: none;
}
</style>