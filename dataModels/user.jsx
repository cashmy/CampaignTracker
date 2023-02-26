// The user will need the following items:

import PropTypes from 'prop-types';

export const userProfile = {
  id: 0,
  firstName: "",        
  lastName: "",         
  displayName: "",      
  role: "user",                       // Virtual/Id from Roles file⁡⁣⁢⁡⁢⁣ ⁣???⁡⁡  admin/user
  photoUrl: "",                       // Avatar Image/url
  initialUrl: "/dashboards/default",  // Landing page AFTER loging in
  
  // Theme Settings:
  allowMultiLanguage: false,          
  layout: "default",                  // Navigation Style/Layout
  themeMode: "light",                 // Light/Dark 
  layoutType: "full-width",           // Layout Types (Fullwidth, Narrow, Boxed)
  themeRTL: false,
  header: "",                         // fixed/fluid 
  displayFooter: false,
  footer: "",                         // fixed/fluid 
  sidebarMenuStyle: "",               // 5 choices
  sidebarImage: false,     
  sidebarImageId: 1,                  // id: 1 - 6
  sidebarBgColor: 0,                  // Background Color palette choice (0-6)
  sidebarColor: 0,                    // Color palette choice (0-21)
  sidebarTextColor:"",                // rgba text setting
  sidebarHeaderColor: "",             // hex value
  sidebarMenuSelectedBgColor: "",     // hex value
  sidebarMenuSelectedTextColor: "",   // rgba text setting 

  // General Palette Choices:
  themeColors: "",                    // Color palette choice
  primaryColor: "",                   // hex value
  secondaryColor: "",                 // hex value
  paperColor: "",                     // hex value
  bgColor: "",                       // hex value

};

userProfile.PropTypes = {
  id: PropTypes.number,
  firstName: PropTypes.string,        
  lastName: PropTypes.string,           
  displayName: PropTypes.string,        
  role: PropTypes.oneOf(["admin", "user"]),                       
  photoUrl: PropTypes.string,                         
  initialUrl: PropTypes.string,  
  
  // Theme Settings:
  allowMultiLanguage: PropTypes.bool,          
  layout: PropTypes.oneOf(["DEFAULT", "BIT_BUCKET", "STANDARD", "DRAWER", "MINI", "MINI_SIDEBAR_TOGGLE", "HEADER_USER", "HEADER_USER_MINI", "H_DEFAULT", "HOR_HEADER_FIXED", "HOR_DARK_LAYOUT"]),                    
  themeMode: PropTypes.oneOf(["light", "dark"]),                    
  layoutType: PropTypes.oneOf(["FULL_WIDTH", "BOXED", "FRAMED"]),             
  themeRTL: PropTypes.bool,
  header: PropTypes.oneOf(["fixed", "fluid"]),                         
  displayFooter: PropTypes.bool,  
  footer: PropTypes.oneOf(["fixed", "fluid"]),                           
  sidebarMenuStyle: PropTypes.oneOf(["DEFAULT", "STANDARD", "ROUNDED", "ROUNDED_REVERSE", "CURVED_MENU"]),              
  sidebarImage: PropTypes.bool,      
  sidebarImageId: PropTypes.number,    
  sidebarBgColor: PropTypes.number,               
  sidebarColor: PropTypes.number,        
  sidebarTextColor: PropTypes.string,
  sidebarHeaderColor: PropTypes.string,
  sidebarMenuSelectedBgColor: PropTypes.string,
  sidebarMenuSelectedTextColor: PropTypes.string,  
  themeColors: PropTypes.string,                      
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  paperColor: PropTypes.string,
  bgColor: PropTypes.string,
};
