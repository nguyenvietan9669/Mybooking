import {TailwindProvider} from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TicketScreens from './screens/Ticket/TicketScreen';
import LocationPopup from './screens/Ticket/LocationPopup';
import TourScreen from './screens/Tour/TourScreen';
import SearchTourPopup from './screens/Tour/SearchTourPopup';
import TourPopup from './screens/Tour/TourPopup';
import TourDetail from './screens/Tour/TourDetail';
import VisaScreen from './screens/Visa/VisaScreen';
import ComboScreen from './screens/Combo/ComboScreen';
import SaleDetail from './screens/Sale/SaleDetail';
import FlightScreen from './screens/Flight/FlightScreen';
import ImageDetail from './components/Image/ImageDetail';
import ContentDetail from './screens/Content/ContentDetail';
import ContentList from './screens/Content/ContentList';
import ComboDetail from './screens/Combo/ComboDetail';
import VisaDetail from './screens/Visa/VisaDetail';
import SupportDetail from './screens/Support/SupportDetail';
import SupportScreen from './screens/Support/SupportScreen';
import BookTickets from './screens/Ticket/BookTickets';
import SearchHomeScreen from './screens/SearchHomeScreen';
import ReceiptTour from './screens/Tour/ReceiptTour';
import ReceiptVisa from './screens/Visa/ReceiptVisa';
import ReceiptCombo from './screens/Combo/ReceiptCombo';
import HotelDetail from './screens/Hotel/HotelDetail';
import UtilitiesScreen from './screens/Hotel/UtilitiesScreen';
import PolicyScreen from './screens/Hotel/PolicyScreen';
import DescriptionScreen from './screens/Hotel/DescriptionScreen';
import HotelScreen from './screens/Hotel/HotelScreen';
import SearchHotel from './screens/Hotel/SearchHotel';
import ReceiptHotel from './screens/Hotel/ReceiptHotel';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <TailwindProvider>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchHome" component={SearchHomeScreen} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="Visa" component={VisaScreen} />
      <Stack.Screen name="VisaDetail" component={VisaDetail} />
      <Stack.Screen name="ReceiptVisa" component={ReceiptVisa} 
         options = {{
          // presentation: 'modal',
          headerShown:false 
        }}
      />

      <Stack.Screen name="Combo" component={ComboScreen} />
      <Stack.Screen name="ComboDetail" component={ComboDetail} />
      <Stack.Screen name="ReceiptCombo" component={ReceiptCombo} 
        options = {{
          headerShown:false 
        }}
      />

      <Stack.Screen name="SaleDetail" component={SaleDetail} />
      <Stack.Screen name="Flight" component={FlightScreen} />
      <Stack.Screen name="ImageDetail" component={ImageDetail} />

      <Stack.Screen name="SupportDetail" component={SupportDetail} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />

      <Stack.Screen name="ContentList" component={ContentList} />
      <Stack.Screen name="ContentDetail" component={ContentDetail} />

      <Stack.Screen name="Location" component={LocationPopup} 
        options = {{
          presentation: 'modal',
          headerShown:false 
        }}
      />
  {/* Khách sạn  */}
      <Stack.Screen name="HotelDetail" component={HotelDetail} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="Utilities" component={UtilitiesScreen} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="Policy" component={PolicyScreen} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="Description" component={DescriptionScreen} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="Hotel" component={HotelScreen} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="SearchHotel" component={SearchHotel} 
        options = {{
          headerShown:false 
        }}
      />
      <Stack.Screen name="ReceiptHotel" component={ReceiptHotel} 
        options = {{
          headerShown:false 
        }}
      />
  {/* Tour  */}
      <Stack.Screen name="Tour" component={TourScreen} />
      <Stack.Screen name="SearchTour" component={SearchTourPopup} 
        options = {{
          // presentation: 'fade',
          headerShown:false 
        }}
      />
      <Stack.Screen name="TourList" component={TourPopup} 
        options = {{
          // presentation: 'fade',
          headerShown:false 
        }}
      />
      <Stack.Screen name="TourDetail" component={TourDetail} 
          options = {{
            headerShown:false 
        }}
      />
      <Stack.Screen name="ReceiptTour" component={ReceiptTour} 
          options = {{
            presentation: 'modal',
            headerShown:false 
        }}
      />
  {/* ----------------------------------------------------- */}
      <Stack.Screen name="Ticket" component={TicketScreens} />
      <Stack.Screen name="BookTickets" component={BookTickets} 
          options = {{
            // presentation: 'modal',
            headerShown:false 
        }}
      />
    </Stack.Navigator>
    </TailwindProvider>  
  </NavigationContainer>
  );
}

