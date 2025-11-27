const productItems = [
				{
					id: 'c1',
					collection: 'Mantra Rings',					
					name: 'Mantra Ring - Classic',
					price: '$1245.00',
          oldPrice: '$1424.00',
          link: '#', //посилання на товар
					img: {
						desktop: {
							'1x': './assets/img/product_2.webp',
							'2x': './assets/img/product_2.webp',
						},
						tablet: {
							'1x': './assets/img/product_2.webp',
							'2x': './assets/img/product_2.webp',
						},
						mobile: {
							'1x': './assets/img/product_2.webp',
							'2x': './assets/img/product_2.webp',
						},
					},
					tags: ['New', 'Sale'],
				},
				{
					id: 'c2',
					collection: 'CharityBands®',
					name: 'Charity Band - Hope',
					price: '$1424.00',
          oldPrice: '$1424.00',
          link: '##', //посилання на товар
					img: {
						desktop: {
							'1x': './assets/img/product_1.png',
							'2x': './assets/img/product_1.png',
						},
						tablet: {
							'1x': './assets/img/product_1.png',
							'2x': './assets/img/product_1.png',
						},
						mobile: {
							'1x': './assets/img/product_1.png',
							'2x': './assets/img/product_1.png',
						},
					},
					tags: ['New'],
				},
				{
					id: 'c3',
					collection: 'Statement Collection',
					name: 'Statement - Bold Necklace',
					price: '$1320.00',
          oldPrice: '$1624.00',
          link: '###', //посилання на товар
					img: {
						desktop: {
							'1x': './assets/img/product_3.webp',
							'2x': './assets/img/product_3.webp',
						},
						tablet: {
							'1x': './assets/img/product_3.webp',
							'2x': './assets/img/product_3.webp',
						},
						mobile: {
							'1x': './assets/img/product_3.webp',
							'2x': './assets/img/product_3.webp',
						},
					},
					tags: ['Sale', 'Best', 'Popular'],
				},
			]

			const list = document.getElementById('bs-list')
			const detailsPic = document.getElementById('bs-picture')
			const tagsWrap = document.getElementById('bs-tags')
			const infoWrap = document.getElementById('bs-info')
			const nameEl = document.getElementById('bs-name')
			const priceEl = document.getElementById('bs-price')
      const oldPriceEl = document.getElementById('bs-oldPrice')
			const overlay = document.getElementById('bs-overlay')
			const modalText = document.getElementById('bs-modal-text')

			let activeId = null

			function createListItem(product) {
				const li = document.createElement('li')
				li.className = 'bestSellers__listItem'
				li.setAttribute('role', 'option')
				li.setAttribute('tabindex', '0')
				li.dataset.id = product.id

				const meta = document.createElement('div')
				meta.className = 'bestSellers__listMeta'

				const link = document.createElement('a')
				link.className = 'bestSellers__collection'
				link.href = '#'
				link.textContent = product.collection
				link.dataset.id = product.id
				
				link.addEventListener('click', e => {
					e.preventDefault()
					selectProduct(product.id)
				})

        const arrow = document.createElement('span')
        arrow.className = 'bestSellers__arrowIcon'
				arrow.setAttribute('aria-label', 'Arrow Icon')
				arrow.innerText = '→'

				meta.appendChild(link)
        meta.appendChild(arrow)

				li.appendChild(meta)

				li.addEventListener('click', () => selectProduct(product.id))
				li.addEventListener('keydown', e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						selectProduct(product.id)
					}
				})

				return li
			}

			function renderList() {
				list.innerHTML = ''
				productItems.forEach((p, i) => {
					const item = createListItem(p, i)
					list.appendChild(item)
				})
			}

			
			function selectProduct(id) {
				if (activeId === id) return
				activeId = id
				
				Array.from(list.children).forEach(li => {
					if (li.dataset.id === id)
						li.classList.add('bestSellers__listItem--active')
					else li.classList.remove('bestSellers__listItem--active')
				})
				
				const product = productItems.find(p => p.id === id)
				if (!product) return
				renderDetails(product)
			}
function renderDetails(product) {
  const picture = document.getElementById('bs-picture');
  picture.innerHTML = '';

  const sources = [
    { media: '(max-width:420px)', img: product.img.mobile },
    { media: '(max-width:991px)', img: product.img.tablet }
  ];

  sources.forEach(s => {
    const source = document.createElement('source');
    source.media = s.media;
    source.srcset = `${s.img['1x']} 1x, ${s.img['2x']} 2x`;
    picture.appendChild(source);
  });

  const img = document.createElement('img');
  img.className = 'bestSellers__picture';
  img.src = product.img.desktop['1x'];
  img.srcset = `${product.img.desktop['1x']} 1x, ${product.img.desktop['2x']} 2x`;
  img.alt = product.name;
  picture.appendChild(img);

  //коли клікаємо на картинку відкривається сторінка товару
  const card = document.getElementById('bs-card');

  let imgLink = card.querySelector('.bestSellers__pictureLink');
  if (!imgLink) {
    imgLink = document.createElement('a');
    imgLink.className = 'bestSellers__pictureLink';
    imgLink.setAttribute('target', '_blank');

    card.appendChild(imgLink);
  }
  imgLink.href = product.link;

const linkEL = card.querySelector('#bs-productInfo')
linkEL.href = product.link;

  //теги 
  tagsWrap.innerHTML = '';
  if (product.tags?.length) {
    product.tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'bestSellers__tag' + (t.toLowerCase() === 'sale' ? ' bestSellers__tag--sale' : '');
      tag.textContent = t;
      tagsWrap.appendChild(tag);
    });
    tagsWrap.setAttribute('aria-hidden', 'false');
  } else {
    tagsWrap.setAttribute('aria-hidden', 'true');
  }
  nameEl.textContent = product.name;
  priceEl.textContent = product.price;
  oldPriceEl.textContent = product.oldPrice;
  infoWrap.setAttribute('aria-hidden', 'false');
}
        //попап
			function openModalFor(id) {
				const product =
					productItems.find(p => p.id === id) ||
					productItems.find(p => p.id === activeId)
				const name = product ? product.name : 'Product'
				modalText.textContent = `${name} has been added to the your cart.`
				overlay.classList.add('active')
				overlay.setAttribute('aria-hidden', 'false')
				
				document.body.style.overflow = 'hidden'
			}
			function closeModal() {
				overlay.classList.remove('active')
				overlay.setAttribute('aria-hidden', 'true')
				document.body.style.overflow = ''
			}
			document
				.getElementById('bs-modal-close')
				.addEventListener('click', closeModal)
			overlay.addEventListener('click', e => {
				if (e.target === overlay) closeModal()
			})
			document.addEventListener('keydown', e => {
				if (e.key === 'Escape') closeModal()
			})

			renderList()
			selectProduct(productItems[0].id) // по замовчуванню перший активний

			// відкриття модалки по кліку на кнопку з оком
			document.getElementById('bs-eye').addEventListener('click', () => {
				openModalFor(activeId)
			})