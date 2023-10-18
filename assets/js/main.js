const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const max_width = 100;
const maxRecords = 10
const limit = 4
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <div class"main">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
            </div>
            <div>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
            <div class="detail">
               
                
                <div class="data">
                <div class="views">
                    <span class="view-info ${pokemon.type}">Info</span>
                    <span>Evolution</span>
                    <span>Moves</span>
                    
                </div>
                <div class="info">
                    <p class="about">
                        ${pokemon.about}
                    </p>
                    
                   
            <div class="container">
			    <span>HP</span>
				<span class="value">${pokemon.hp}</span>
				<span style="width: calc((${pokemon.hp} / 100) * ${max_width}%);" class="skills HP ${pokemon.type}"></span>
			</div>
            <div class="container">
									<span>ATK</span>
									<span class="value">${pokemon.atk}</span>
									<span style="width: calc((${pokemon.atk} / 100) * ${max_width}%); "class="skills ATK ${pokemon.type}"></span>
								</div>
								  <div class="container">
									<span>DEF</span>
									<span class="value">${pokemon.def}</span>
									<span style="width: calc((${pokemon.def} / 100) * ${max_width}%);" class="skills DEF ${pokemon.type}"></span>
								</div>
								   <div class="container">
									<span>SATK</span>
									<span class="value">${pokemon.satk}</span>
									<span style="width: calc((${pokemon.satk} / 100) * ${max_width}%);"  class="skills SATK ${pokemon.type}"></span>
								</div>
									<div class="container">
									<span>SDEF</span>
									<span class="value">${pokemon.sdef}</span>
									<span style="width: calc((${pokemon.sdef} / 100) * ${max_width}%);" class="skills SDEF ${pokemon.type}"></span>
								</div>
								<div class="container">
									<span>SPD</span>
									<span class="value">${pokemon.spd}</span>
									<span style="width: calc((${pokemon.spd} / 100) * ${max_width}%);"  class="skills SPD ${pokemon.type}"></span>
								</div>
							</div>
					
							
						</div>
					</div>
				</li>`;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})