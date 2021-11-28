let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes')
let segundos

var bell = new Audio("./audio/bell.mp3")
var volta = new Audio("./audio/volta.mp3")
var final = new Audio("./audio/final.mp3")

var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

function pausar(){
	lofi.pause()
	play.style.setProperty('display', 'block', 'important')
	pause.style.setProperty('display', 'none', 'important')
}

function executar(){
	lofi.play()
	play.style.setProperty('display', 'none', 'important')
	pause.style.setProperty('display', 'block', 'important')
}


function iniciar() {

	if (acao.value == 0) {
		document.getElementById('erro-acao').innerHTML = "Adicione os minutos"
		acao.focus()
	} else if (pausa.value == 0) {
		document.getElementById('erro-pausa').innerHTML = "Adicione a pausa"
		acao.focus()
	} else if (sessoes.value == 0) {
		document.getElementById('erro-sessoes').innerHTML = "Adicione as sessões"
		acao.focus()
	} else {
		lofi.play()
		pause.style.setProperty('display', 'block', 'important')

		localStorage.setItem('acao', String(acao.value))
		localStorage.setItem('pausa', String(pausa.value))
		localStorage.setItem('sessoes', String(sessoes.value))

		document.getElementById('config').style.setProperty('display', 'none', 'important')
		document.getElementById('timer').style.setProperty('display', 'block', 'important')

		momentoAcao()
	}

}

function momentoAcao() {

	let sessoes_valor = localStorage.getItem('sessoes')

	if (sessoes_valor != '1') {
		document.getElementById('title_sessao').innerHTML = sessoes_valor + ' Sessões restantes'
	} else {
		document.getElementById('title_sessao').innerHTML = sessoes_valor + ' Sessão restante'
	}

	let title = document.getElementById('title')
	title.innerHTML = "Ação"
	title.style.fontSize = '25pt'
	title.style.fontWeight = 'bold'
	title.style.setProperty('color', '#28a745', 'important')

	min = Number(localStorage.getItem('acao'))

	min = min - 1
	segundos = 59

	document.getElementById('minutes_ok').innerHTML = min
	document.getElementById('seconds_ok').innerHTML = segundos

	var min_interval = setInterval(minTimer, 60000)
	var segundos_interval = setInterval(segundoTimer, 1000)

	function minTimer() {
		min = min - 1
		document.getElementById('minutes_ok').innerHTML = min
	}

	function segundoTimer() {
		segundos = segundos - 1
		document.getElementById('seconds_ok').innerHTML = segundos

		if (segundos <= 0) {
			if (min <= 0) {
				clearInterval(min_interval)
				clearInterval(segundos_interval)

				bell.play();

				momentoPausa()
			}
			segundos = 60
		}
	}

}

function momentoPausa() {
	let title = document.getElementById('title')
	title.innerHTML = "PAUSA"
	title.style.fontSize = '25pt'
	title.style.fontWeight = 'bold'
	title.style.setProperty('color', '#dc3545', 'important')

	min_pausa = Number(localStorage.getItem('pausa'))

	min_pausa = min_pausa - 1
	segundos = 59

	document.getElementById('minutes_ok').innerHTML = min_pausa
	document.getElementById('seconds_ok').innerHTML = segundos

	var min_interval = setInterval(minTimer, 60000)
	var segundos_interval = setInterval(segundoTimer, 1000)

	function minTimer() {
		min_pausa = min_pausa - 1
		document.getElementById('minutes_ok').innerHTML = min_pausa
	}

	function segundoTimer() {
		segundos = segundos - 1
		document.getElementById('seconds_ok').innerHTML = segundos

		if (segundos <= 0) {
			if (min_pausa <= 0) {
				ses = Number(localStorage.getItem('sessoes'))
				ses = ses - 1
				localStorage.setItem('sessoes', String(ses))

				clearInterval(min_interval)
				clearInterval(segundos_interval)
				if (ses <= 0) {
					final.play()
					localStorage.clear()

					document.getElementById('config').style.setProperty('display', 'none', 'important')
					document.getElementById('timer').style.setProperty('display', 'none', 'important')
					document.getElementById('fim').style.setProperty('display', 'block', 'important')
				} else{
					volta.play();
					momentoAcao()
				}


			}
			segundos = 60
		}
	}
}