import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Filter, MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

const ShopsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedShop, setSelectedShop] = useState(null);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fashion', name: 'Fashion & Clothing' },
    { id: 'beauty', name: 'Beauty & Cosmetics' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'home', name: 'Home & Lifestyle' },
    { id: 'services', name: 'Services' }
  ];

  const shops = [
    {
      id: 1,
      name: 'Selfridges',
      category: 'fashion',
      description: 'Iconic department store with luxury fashion, beauty, and lifestyle brands',
      address: '400 Oxford Street, London W1A 1AB',
      phone: '+44 800 123 400',
      hours: 'Mon-Sat: 9:30am-10pm, Sun: 11:30am-6pm',
      website: 'https://www.selfridges.com',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'John Lewis',
      category: 'home',
      description: 'Department store offering fashion, home, beauty, and technology',
      address: '300 Oxford Street, London W1C 1DX',
      phone: '+44 20 7629 7711',
      hours: 'Mon-Sat: 9:30am-8pm, Sun: 12pm-6pm',
      website: 'https://www.johnlewis.com',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Zara',
      category: 'fashion',
      description: 'Contemporary fashion for men, women, and children',
      address: '118 Oxford Street, London W1D 2LF',
      phone: '+44 20 7534 9500',
      hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
      website: 'https://www.zara.com',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Apple Store',
      category: 'electronics',
      description: 'Latest Apple products, accessories, and technical support',
      address: '235 Oxford Street, London W1C 2LL',
      phone: '+44 20 7153 9000',
      hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
      website: 'https://www.apple.com/uk',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Marks & Spencer',
      category: 'fashion',
      description: 'British retailer offering clothing, home products, and food',
      address: '458 Oxford Street, London W1C 1AP',
      phone: '+44 20 7935 7954',
      hours: 'Mon-Sat: 8am-10pm, Sun: 12pm-6pm',
      website: 'https://www.marksandspencer.com',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'Boots',
      category: 'beauty',
      description: 'Health and beauty retailer with pharmacy services',
      address: '360 Oxford Street, London W1C 1JN',
      phone: '+44 20 7491 8546',
      hours: 'Mon-Sat: 8am-10pm, Sun: 12pm-6pm',
      website: 'https://www.boots.com',
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openShopModal = (shop) => {
    setSelectedShop(shop);
  };

  const closeShopModal = () => {
    setSelectedShop(null);
  };

  return (
    <section id="shops" className="luxury-spacing bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heritage-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Shops Directory
          </h2>
          <p className="heritage-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover over 300 shops, restaurants, and services along Oxford Street.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search shops, brands, or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 heritage-sans focus-visible:focus-visible"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="heritage-sans border border-input bg-background px-3 py-2 rounded-md focus-visible:focus-visible touch-target"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="heritage-sans text-sm text-muted-foreground">
            Showing {filteredShops.length} of {shops.length} shops
          </p>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredShops.map(shop => (
            <div key={shop.id} className="luxury-card bg-white rounded-lg overflow-hidden shadow-md luxury-motion">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="heritage-serif text-white text-xl font-bold">
                      {shop.name.charAt(0)}
                    </span>
                  </div>
                  <span className="heritage-sans text-xs text-muted-foreground uppercase tracking-wide">
                    {categories.find(cat => cat.id === shop.category)?.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="heritage-serif text-xl font-semibold text-primary mb-2">
                  {shop.name}
                </h3>
                <p className="heritage-sans text-sm text-muted-foreground mb-4 line-clamp-2">
                  {shop.description}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="heritage-sans">{shop.address.split(',')[0]}</span>
                </div>
                
                <Button
                  onClick={() => openShopModal(shop)}
                  className="w-full touch-target focus-visible:focus-visible"
                  size="sm"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-secondary/30 p-8 rounded-lg">
          <h3 className="heritage-serif text-2xl font-semibold text-primary mb-4 text-center">
            Interactive Map
          </h3>
          <div className="map-embed h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="heritage-sans text-muted-foreground mb-4">
                Interactive map will be integrated here
              </p>
              <Button variant="outline" className="touch-target focus-visible:focus-visible">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details Modal */}
      {selectedShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="heritage-serif text-2xl font-bold text-primary">
                  {selectedShop.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeShopModal}
                  className="touch-target focus-visible:focus-visible"
                >
                  ×
                </Button>
              </div>
              
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="heritage-serif text-white text-2xl font-bold">
                      {selectedShop.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="heritage-sans text-muted-foreground mb-6">
                {selectedShop.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="heritage-sans font-medium">Address</p>
                    <p className="heritage-sans text-sm text-muted-foreground">
                      {selectedShop.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="heritage-sans font-medium">Opening Hours</p>
                    <p className="heritage-sans text-sm text-muted-foreground">
                      {selectedShop.hours}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="heritage-sans font-medium">Phone</p>
                    <p className="heritage-sans text-sm text-muted-foreground">
                      {selectedShop.phone}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 touch-target focus-visible:focus-visible">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 touch-target focus-visible:focus-visible"
                  onClick={() => window.open(selectedShop.website, '_blank', 'noopener,noreferrer')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopsDirectory;

