
document.addEventListener('DOMContentLoaded', function () {
    var app = new Vue({
        el: '#app',
        data: {
            active: null,
            mode: false,
            modeType: "DEF",
            items: []
        },
        methods: {
            changeBackound() {
                this.mode = !this.mode
                this.modeType === "DEF" ? this.modeType = "БОЙ" : this.modeType = "DEF"
            },
            doCopy(e) {
                let copyText = document.getElementById('copy');
                let inputElement = e.target.closest(".input-icon").previousElementSibling;
                inputElement.select();

                try {
                    let successful = document.execCommand('copy');
                    if (successful) {
                        var msg = "скопировано";
                    } else {
                        var msg = "ошибка";
                        copyText.style = "color: tomato"
                    }
                    copyText.innerHTML = msg
                    setTimeout(() => copyText.innerHTML = "", 1000);
                    console.log('Copy command was ' + msg);
                } catch (err) {
                    console.log('Oops, unable to copy');
                }
                window.getSelection().removeAllRanges();
            }
        },

        watch: {
            mode() {
                let body = document.getElementsByTagName("body")[0];
                this.mode === true ? body.style = "background: url(assets/1.jpg)" : body.style = "background: url(assets/2.jpg)"
            }
        },

        created() {
            fetch("assets/data-temp.json")
                .then(response => response.json())
                .then(data => (this.items = data, this.active = data[0]["connectionName"]));

        }
    })
})
