import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles";
import LogoImg from "../../assets/logo.svg"

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={LogoImg} alt=""/>
                <NewTransactionsButton>Nova transação</NewTransactionsButton>
            </HeaderContent>
        </HeaderContainer>
    )
}