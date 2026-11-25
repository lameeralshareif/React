import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Produces oxygen at night and tolerates low light.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
          description: 'Filters indoor pollutants and grows easily in pots.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
          description: 'Thrives in shade and adds clean indoor greenery.',
          cost: '$18',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1565011523534-747a8601f10a?auto=format&fit=crop&w=800&q=80',
          description: 'Known for its calming scent and purple flower spikes.',
          cost: '$20',
        },
        {
          name: 'Rosemary',
          image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
          description: 'Aromatic culinary herb with pine-like foliage.',
          cost: '$15',
        },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        {
          name: 'Aloe Vera',
          image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
          description: 'Succulent plant with soothing gel inside its leaves.',
          cost: '$14',
        },
        {
          name: 'Peppermint',
          image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg',
          description: 'Refreshing mint leaves great for herbal tea.',
          cost: '$13',
        },
      ],
    },
  ];

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#2e7d32', color: '#fff' }}>
        <button type="button" onClick={onHomeClick} style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
          Paradise Nursery
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => setShowCart(false)} style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Plants
          </button>
          <button type="button" onClick={() => setShowCart(true)} style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Cart ({totalCartCount})
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '1.5rem' }}>
          {plantsArray.map((categorySection) => (
            <section key={categorySection.category} style={{ marginBottom: '2rem' }}>
              <h2>{categorySection.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                {categorySection.plants.map((plant) => {
                  const isAdded = Boolean(addedToCart[plant.name]);
                  return (
                    <div key={plant.name} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <h3 style={{ marginTop: '0.5rem' }}>{plant.name}</h3>
                      <p style={{ margin: '0.5rem 0' }}>{plant.description}</p>
                      <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: isAdded ? 'default' : 'pointer' }}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
