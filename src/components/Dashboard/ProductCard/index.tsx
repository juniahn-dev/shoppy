import { IProductListProps } from '@/types/firebaseTypes';
import ImageComponent from '@/components/Common/Image';
import styles from './index.module.scss';

interface IProductCardProps {
  product: IProductListProps;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  return (
    <div className={styles.container}>
      <ImageComponent className={styles.image} src={product.image} />
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>
          <div className={styles.title}>{product.title}</div>${product.price}
        </div>
        {product.category}
      </div>
    </div>
  );
};

export default ProductCard;
