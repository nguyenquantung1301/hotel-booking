// Mock data cho ứng dụng hotel booking
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    email: 'admin@hotel.com',
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    email: 'user@gmail.com',
  },
]

export const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Ocean View',
    description: 'Luxury room with stunning ocean views, king-size bed, and modern amenities.',
    address: '123 Beach Resort, Nha Trang',
    price: 150,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop',
  },
  {
    id: 2,
    name: 'Standard Double Room',
    description: 'Comfortable room with twin beds, air conditioning, and city view.',
    address: '456 City Hotel, Ho Chi Minh',
    price: 80,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop',
  },
  {
    id: 3,
    name: 'Presidential Suite',
    description: 'Luxury suite with separate living room, jacuzzi, and panoramic views.',
    address: '789 Grand Hotel, Ha Noi',
    price: 300,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop',
  },
  {
    id: 4,
    name: 'Family Room',
    description: 'Spacious room perfect for families with 2 double beds and kitchenette.',
    address: '321 Family Resort, Da Lat',
    price: 120,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=250&fit=crop',
  },
  {
    id: 5,
    name: 'Budget Single Room',
    description: 'Clean and affordable single room with basic amenities.',
    address: '654 Budget Inn, Can Tho',
    price: 50,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
  },
]

export const mockBookings = [
  {
    id: 1,
    bookingNumber: 'HTL001',
    bookingDate: '2024-02-15',
    user: mockUsers[0],
    room: mockRooms[0],
    contact: {
      title: 'Mr.',
      name: 'John Doe',
      email: 'john@email.com',
    },
    taxPercent: 10,
    totalPrice: 165,
    status: 'confirmed', // confirmed, cancelled
  },
  {
    id: 2,
    bookingNumber: 'HTL002',
    bookingDate: '2024-01-20',
    user: mockUsers[0],
    room: mockRooms[1],
    contact: {
      title: 'Ms.',
      name: 'Jane Smith',
      email: 'jane@email.com',
    },
    taxPercent: 10,
    totalPrice: 88,
    status: 'confirmed',
  },
]

export const loginUser = async (username: string, password: string) => {
  let localUsers: any[] = []
  try {
    const localUsersStr = localStorage.getItem('localUsers')
    if (localUsersStr) {
      localUsers = JSON.parse(localUsersStr)
    }
  } catch {}

  const allUsers = [...mockUsers, ...localUsers]
  const user = allUsers.find((u) => u.username === username && u.password === password)
  if (!user) {
    throw new Error('Login failed. Please check your credentials.')
  }
  return {
    token: 'mock-jwt-token-' + Date.now(),
    user: { id: user.id, username: user.username },
  }
}

export const registerUser = async (username: string, password: string, email: string) => {
  let localUsers: any[] = []
  try {
    const localUsersStr = localStorage.getItem('localUsers')
    if (localUsersStr) {
      localUsers = JSON.parse(localUsersStr)
    }
  } catch {}

  const allUsers = [...mockUsers, ...localUsers]
  const existingUser = allUsers.find((u) => u.username === username || u.email === email)
  if (existingUser) {
    throw new Error('User already exists')
  }
  const newUser = {
    id: Date.now(),
    username,
    password,
    email,
  }
  localUsers.push(newUser)
  localStorage.setItem('localUsers', JSON.stringify(localUsers))
  return 'Registration successful'
}

export const getRooms = async (bookingDate: string) => {
  console.log('Searching rooms for date:', bookingDate)
  return {
    content: mockRooms,
  }
}

export const getRoomDetail = async (roomId: string) => {
  const room = mockRooms.find((r) => r.id === parseInt(roomId))
  if (!room) {
    throw new Error('Room not found')
  }
  return room
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bookRoom = async (roomId: string, bookingDate: string, contact: any) => {
  const room = mockRooms.find((r) => r.id === parseInt(roomId))
  if (!room) {
    throw new Error('Room not found')
  }

  const newBooking = {
    id: Date.now(),
    bookingNumber: 'HTL' + Date.now().toString().slice(-6),
    bookingDate,
    user: mockUsers[0], // Use full user object
    room,
    contact,
    taxPercent: 10,
    totalPrice: room.price + room.price * 0.1,
    status: 'confirmed',
  }

  mockBookings.push(newBooking)
  return newBooking
}

export const getMyBookings = async () => {
  return mockBookings.filter((booking) => booking.status === 'confirmed')
}

export const getBookingDetail = async (bookingId: string) => {
  const booking = mockBookings.find((b) => b.id === parseInt(bookingId))
  if (!booking) {
    throw new Error('Booking not found')
  }
  return booking
}

export const cancelBooking = async (bookingId: string) => {
  const bookingIndex = mockBookings.findIndex((b) => b.id === parseInt(bookingId))
  if (bookingIndex === -1) {
    throw new Error('Booking not found')
  }

  const booking = mockBookings[bookingIndex]
  if (booking.status === 'cancelled') {
    throw new Error('Booking is already cancelled')
  }

  mockBookings[bookingIndex] = {
    ...booking,
    status: 'cancelled',
  }

  return 'Booking cancelled successfully'
}
