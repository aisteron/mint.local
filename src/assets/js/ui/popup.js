import { load_toast, qs, qsa, xml } from "../libs";

let cfg = {
	cb: {
		message: "Для заявки на приобретение <span class='g'>mint barrier<span>, пожалуйста, оставьте свой номер телефона <br><span class='b'>и мы вам перезвоним</b>",
		placeholder: "Ваш телефон",
		cls: "tel"
	},
	pricelist: {
		message: "Для получения прайс-листа,пожалуйста, оставьте свою электронную почту",
		placeholder: "Ваша электронная почта",
		cls: "email"
	},
	success: {
		message: "Успех! <br> Ожидайте, когда менеджер <br>с вами свяжется",
		cls: "success"
	}
}

export function popup(){
	close()
	open(cfg)
	send()
}

function open(cfg){
	let button_order = qs("button.order")
	
	button_order &&
		button_order.addEventListener("click", _ => draw(cfg.cb))
	

	qsa("li.price a").forEach(el => {
		el.addEventListener("click", event => {
			event.preventDefault()
			draw(cfg.pricelist)
		})
	})

}

function draw(config){
	let wrapper= qs(".modal-wrapper")
	let modal = qs(".modal-wrapper .modal")
	wrapper.classList.add("open")

	qs(".message", modal).innerHTML = config.message
	qs(".modal form input").classList = config.cls
	qs(".modal form label span").innerHTML = config.placeholder

}

function close(){

	qs(".modal img.close").addEventListener("click", event => {
		qs(".modal-wrapper").classList.remove("open")
	})

	qs(".modal-wrapper").addEventListener("click", event => {
		if(event.target == qs(".modal-wrapper .modal")) return
		if(qs(".modal-wrapper .modal").contains(event.target)) return
		qs(".modal-wrapper").classList.remove("open")
	})
}

function send(){
	
	qs('.modal form').addEventListener("submit", event => {
		event.preventDefault()
		let input = qs("input",event.target)
		let t = input.classList[0]

		let obj = {
			type: t,
			data: input.value
		}

		xml("callback", obj, "api")
		.then(r => JSON.parse(r))
		.then(async (r) => {await load_toast(); return r})
		.then(r => {
			if(!r.success){
				new Snackbar("❌Произошла ошибка. Попробуйте позже")
			} else {
				qs(".modal .message").remove()
				qs(".modal form").remove()
				
				let str = `<img src="/assets/img/icons/ok.svg" width="88" height="88">
										<span class="txt">Успех! <br> Ожидайте, когда менеджер <br> с вами свяжется</span>
										<button class="order grey">Закрыть</button>`
				
				qs(".modal img.close").insertAdjacentHTML("afterend", str)

				qs('button.order.grey').addEventListener("click", _ =>{
					qs(".modal-wrapper").classList.remove("open")
				})
			}
		})
		
	})
}