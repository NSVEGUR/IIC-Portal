const links = document.querySelectorAll('header > div > nav > a');

links.forEach((link) => {
	link.addEventListener('click', (e) => {
		links.forEach((l) => {
			l.classList.remove('active');
		});
		link.classList.add('active');
	})
});