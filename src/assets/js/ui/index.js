import { qs,qsa,sw } from "../libs";
import { popup } from "./popup";
export function Ui(){
	swiper()
	open_mobile_menu()
	popup()
}

async function swiper(){
	let obj = qs('.swiper') 
	if(!obj) return
	await sw.load()

	let cfg = {
		pagination: {
			el: qs(".swiper-pagination",obj),
		},
	}
	sw.init(obj, cfg)
}

function open_mobile_menu(){
	qs('#nav-icon1').addEventListener("click", event => {
		event.target.classList.toggle("open")
		qs('header nav').classList.toggle("open")
	})
}