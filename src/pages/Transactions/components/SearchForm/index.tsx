import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = zod.object({
  query: zod.string(),
});
type SearchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
    const {fetchTransactions} = useContext(TransactionsContext)
  const { register, handleSubmit, formState:{isSubmitting} } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
    console.log(data);
  }
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        {...register("query")}
        placeholder="Buscar transações"
      />
      <button type="submit" disabled={isSubmitting}>Pesquisar</button>
    </SearchFormContainer>
  );
}
