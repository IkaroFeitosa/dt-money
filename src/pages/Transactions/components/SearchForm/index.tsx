import { SearchFormContainer } from "./styles";

export function SearchForm(){
    return(
        <SearchFormContainer>
            <input type="text" placeholder="Buscar transações"/>
            <button>Pesquisar</button>
        </SearchFormContainer>
    )
}