import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionTypeButton,
  TransactionTypeContainer,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});
type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext,(context)=>{
    return context.createTransaction
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  });
  async function handleCreateTransaction(data: NewTransactionFormInputs) {
    const {description, price, category, type} = data
    createTransaction({description, price, category, type})
    reset()
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form action="" onSubmit={handleSubmit(handleCreateTransaction)}>
          <input
            type="text"
            {...register("description")}
            placeholder="Descrição"
            required
          />
          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            placeholder="Preço"
            required
          />
          <input
            type="text"
            {...register("category")}
            placeholder="Categoria"
            required
          />

          <Controller
            control={control}
            name="type"
            render={({field}) => (
              <TransactionTypeContainer value={field.value} onValueChange={field.onChange}>
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionTypeContainer>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
