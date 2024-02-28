// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
let channelSlug = 'grid-core-urhajk-yqde' 


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link') 

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	// channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')


	// Links!
	if (block.class == 'Link') {
		let linkItem =
			`
			<li class="block block--link">
				<button class="image-button">
					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
					<img src="${ block.image.original.url }">
				</button>

				<div class="block--link__description">
					<section class="description-body">	
						<button class="close-button">X</button>	
						<div class="displayrow">				
						<a href="${ block.source.url }">
							<img src="${ block.image.large.url }" alt="${ block.title } by ${ block.user.full_name }">
						</a>
						<figcaption>
							<h7>${ block.title }</h7>
						</figcaption>
						</div>						
					</section>	
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}


	// Images!
	else if (block.class == 'Image') {
		
		let ImageItem =
		`
			<li class="block block--image">
		    	<button class="image-button">
					<img src="${block.image.large.url}"alt="${block.title} by ${block.author}">
				</button>

				<div class="block--image__description">
					<section class="description-body">
						<button class="close-button">X</button>
						<div class="displayrow">
							<img src="${ block.image.large.url }" alt="${ block.title } by ${ block.user.full_name }">
							<figcaption>
								<div class="h7">${ block.title }<div>
							</figcaption>
						</div>
					</section>	
				</div>	
			</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', ImageItem)
	}

	
	
	// Text!
	else if (block.class == 'Text') {
		
		let textItem =
			`
				<li class = "block block--text">
					<button class="image-button">
						<blockquote >
							${block.content_html}
						</blockquote>
					</button>

					<div class="block--text__description">
						<section class="description-body">
							<button class="close-button">X</button>
							<div class="displayrow">
							<blockquote >
								${block.content_html}
							</blockquote>
							<figcaption>
								<h7>${ block.title }</h7>
							</figcaption>
							</div>
						</section>	
					</div>	
				</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}



	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		
	// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li>
					<video controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

	
 	// Uploaded PDFs!
	else if (attachment.includes('pdf')) {
    

    let pdfItem = 
	`
        <li class="block block--pdf">
            <button class="image-button">
                    <img src="${block.image.large.url}" alt="${block.title}" style="max-inline-size: 75%; transform: translateX( 17% );">
            </button>

			<div class="block--pdf__description">
				<section class="description-body">
					<button class="close-button">X</button>
					<div class="displayrow">
					<a href="${block.attachment.url}" alt="${block.title}">
                    	<img src="${block.image.large.url}" alt="${block.title}" style="max-inline-size: 75%; transform: translateX( 17% );">
                	</a>
					<figcaption>
						<h7>${ block.title }</h7>
					</figcaption>
					</div>
				</section>	
			</div>	
        </li>
    `

    channelBlocks.insertAdjacentHTML('beforeend', pdfItem);
}


	// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<audio controls src="${ block.attachment.url }"></audio>
				</li>
				`
			channelBlocks.insertAdjacentHTML('afterbegin', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}


	// Linked media…
		else if (block.class == 'Media') {
		let embed = block.embed.type


	// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="block block--video">
					<button class="image-button">
						<img src="${block.image.large.url}" alt="${block.title}">
					</button>

					<div class="block--video__description">
						<section class="description-body">
							<button class="close-button">X</button>
							<div class="displayrow">
							${ block.embed.html }
							<figcaption>
								<h7>${ block.title }</h7>
							</figcaption>
							</div>
						</section>	
					</div>
				</li>

				
				`
			channelBlocks.insertAdjacentHTML('afterbegin', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}




	// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!
			let richItem =
			`
				<li li class="block block--rich">
					<button class="image-button">
						<img src="${block.image.large.url}" alt="${block.title}">
					</button>

					<div class="block--rich__description">
						<section class="description-body">
							<button class="close-button">X</button>
							<div class="displayrow">
							${ block.embed.html }
							<figcaption>
								<h7>${ block.title }</h7>
							</figcaption>
							</div>
						</section>	
					</div>
				</li>
			`
			channelBlocks.insertAdjacentHTML('afterbegin', richItem)
		}
	}
}


// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`,{ cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		// Also display the owner and collaborators:
		// let channelUsers = document.getElementById('channel-users') // Show them together
		// data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		// renderUser(data.user, channelUsers)

		var openalready = false;
		let openButtons = document.querySelectorAll('.block .image-button');
			openButtons.forEach((openButton) => {
				openButton.onclick = () => {
					//console.log(openalready);
					if (!openalready){
						let blockdescription = openButton.nextElementSibling;						
						blockdescription.classList.add('active');
						openalready = true;

						openButton.closest('.block').classList.add('disable-hover');
					}
					else{
					}
		};
	})

	let closeButtons = document.querySelectorAll('.block .close-button');
		closeButtons.forEach((closeButton) =>{
			closeButton.onclick = () => {
				let blockdescription =  closeButton;		
				blockdescription.parentElement.parentElement.classList.remove('active');
				openalready = false;	
				
				closeButton.closest('.block').classList.remove('disable-hover');
			}
		})

	})