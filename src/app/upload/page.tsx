'use client';

import { MouseEvent, useCallback, useEffect, useState } from 'react';

import Wrapper from '@/components/Wrapper';
import { insertProduct } from '@/api/firebase';
import styles from './index.module.scss';

export default function Upload() {
  const [productImg, setProductImg] = useState<FileList | null>(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [options, setOptions] = useState('');

  const submitProduct = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    insertProduct(productName, price, category, productDescription, options);
  };

  useEffect(() => {
    if (productImg) {
      const image = productImg[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const ImgElement = document.getElementById('uploadImage') as HTMLImageElement;
        if (ImgElement && e.target) {
          const resultImg = e.target.result as string;
          ImgElement.src = resultImg || '';
        }
      };
      reader.readAsDataURL(image);
    } else {
      const ImgElement = document.getElementById('uploadImage') as HTMLImageElement;
      if (ImgElement) {
        ImgElement.src = '';
      }
    }
  }, [productImg]);

  return (
    <Wrapper requireAdmin>
      <div>
        <div className={styles.title}>Submit New Product</div>
        {productImg && <img className={styles.uploadImage} id="uploadImage" />}
        <form className={styles.formContainer}>
          <input type="file" onChange={(val) => setProductImg(val.target.files || null)} required />
          <input
            placeholder="Product Name"
            value={productName || ''}
            onChange={(val) => setProductName(val.target.value || '')}
            required
          />
          <input
            placeholder="Price"
            onChange={(val) => setPrice(Number(val.target.value) || 0)}
            type="number"
            required
          />
          <input
            placeholder="Category"
            value={category || ''}
            onChange={(val) => setCategory(val.target.value || '')}
            required
          />
          <input
            placeholder="Product Description"
            value={productDescription || ''}
            onChange={(val) => setProductDescription(val.target.value || '')}
            required
          />
          <input
            placeholder="Options (divide ',')"
            value={options || ''}
            onChange={(val) => setOptions(val.target.value || '')}
            required
          />
          <button className={styles.submitButton} onClick={submitProduct}>
            Submit Product
          </button>
        </form>
      </div>
    </Wrapper>
  );
}
