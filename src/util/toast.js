export default function(opts) {
	if(!opts) return
	let message = opts.message ? opts.message : opts
	let duration = opts.duration
	let toaster = document.createElement('div')
	toaster.textContent = message
	toaster.style.backgroundColor = 'rgba(0,0,0, .7)'
	toaster.style.position = 'fixed'
	toaster.style.left = 0
	toaster.style.right = 0
	toaster.style.bottom = 0
	toaster.style.top = 0
	toaster.style.margin = 'auto'
	toaster.style.color = '#fff'
	toaster.style.fontSize = '16px'
	toaster.style.width = (message.length*16 + 40) + 'px'
	toaster.style.height = '40px'
	toaster.style.lineHeight = '20px'
	toaster.style.padding = '8px'
	toaster.style.zIndex = '600'
	toaster.style.textAlign = 'center'
	toaster.style.borderRadius = '5px'

	document.body.appendChild(toaster)
	setTimeout(function() {
		document.body.removeChild(toaster)
	}, duration || 2000)
}
