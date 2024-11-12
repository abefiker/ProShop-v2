import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import Resizer from 'react-image-file-resizer';
import Meta from '../../components/Meta';
const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [imgPercentage, setImgPercentage] = useState(0);

  const [updateProduct, { isLoading: isUpdate }] = useUpdateProductMutation();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setThumbnailUrl(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  // Handle file selection

  // Handle file selection and resizing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        Resizer.imageFileResizer(
          file,
          640, // target width
          510, // target height
          'JPEG', // output format; use 'PNG' if needed
          90, // quality
          0, // rotation
          (resizedImage) => {
            setImage(resizedImage); // Set resized image
          },
          'file' // output type: can also be 'blob' or 'base64'
        );
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  };

  // Upload file when a new thumbnail is selected
  useEffect(() => {
    if (image) {
      uploadFile(image, 'imagesProshop');
    }
  }, [image]);

  // Upload file to Firebase Storage
  const uploadFile = (file, folder) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPercentage(Math.round(progress));
      },
      (error) => {
        console.error('Upload error:', error);
        toast.error('Error uploading image: ' + error.message); // Show error to user
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Uploading image', downloadURL);
          setThumbnailUrl(downloadURL); // Set image URL
        });
      }
    );
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    // Make sure the image URL is set before submitting
    if (!thumbnailUrl) {
      toast.error('Please upload an image');
      return;
    }

    const updateproduct = {
      productId,
      name,
      price,
      image: thumbnailUrl, // The uploaded image URL
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updateproduct).unwrap();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Product Updated Successfully');
      refetch();
      navigate('/admin/productlist');
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.msg || error.msg}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* Image upload handling */}
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                ></Form.Control>
              </Form.Group>
              {imgPercentage > 0 && <p>Upload Progress: {imgPercentage}%</p>}
              <Form.Group controlId="brand" className="my-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock" className="my-3">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category" className="my-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description" className="my-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="my-2"
                disabled={isUpdate || imgPercentage < 100}
              >
                {isUpdate ? 'Updating...' : 'Update'}
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
