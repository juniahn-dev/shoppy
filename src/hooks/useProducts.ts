import { ICartProductAmountProps, ICartProps, IDeleteCartProductProps } from '@/types/common';
import { changeProductAmountInCart, deleteProductInCart, insertUserCart } from '@/api/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useProduct() {
  const queryClient = useQueryClient();

  const changeProductAmount = useMutation({
    mutationFn: async ({ changeTarget, product, uid }: ICartProductAmountProps) =>
      await changeProductAmountInCart(changeTarget, product, uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersCart'] }),
  });

  const deleteCart = useMutation({
    mutationFn: async ({ product, uid }: IDeleteCartProductProps) => await deleteProductInCart(product, uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersCart'] }),
  });

  const insertCart = useMutation({
    mutationFn: async ({ id, product, option, uid }: ICartProps) =>
      await insertUserCart(id, product.image, product.title, product.price, option, uid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usersCart'] }),
  });

  return { changeProductAmount, insertCart, deleteCart };
}
