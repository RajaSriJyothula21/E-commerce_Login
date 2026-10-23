
import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import {
  AdminPanelSettings,
  ShoppingBag,
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
} from "@mui/icons-material";

// Material UI theme
const theme = createTheme({
  palette: {
    primary: { main: "#4f46e5" },
    success: { main: "#059669" },
    background: { default: "#f5f7fc" },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Read saved email safely
const getSavedLogin = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
};

// Login card component
function LoginCard({
  type,
  title,
  description,
  storageKey,
  color,
  Icon,
}) {
  const saved = getSavedLogin(storageKey);

  const [email, setEmail] = useState(
    saved.remember ? saved.email || "" : ""
  );

  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(
    Boolean(saved.remember)
  );

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission and redirect
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save email only; never save the password
    if (remember) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          email: email,
          remember: true,
        })
      );
    } else {
      localStorage.removeItem(storageKey);
    }

    // Redirect to the correct website
    if (type === "Admin") {
      window.location.href =
        "https://e-commerce-customer-seven.vercel.app/";
    } else if (type === "Customer") {
      window.location.href =
        "https://e-commerce-admin-xi-seven.vercel.app";
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 4,
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 18px 45px rgba(15,23,42,0.09)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        {/* Login icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 3,
            bgcolor: `${color}15`,
            color: color,
            display: "grid",
            placeItems: "center",
            mb: 3,
          }}
        >
          <Icon sx={{ fontSize: 32 }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          fontWeight={750}
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.8, mb: 3 }}
        >
          {description}
        </Typography>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {/* Login form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      edge="end"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Remember email and forgot password */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                  size="small"
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  Remember email
                </Typography>
              }
            />

            <Link
              href="#"
              underline="hover"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                setMessage(
                  "Please use your account's password recovery process."
                );
              }}
            >
              Forgot password?
            </Link>
          </Stack>

          {/* Submit and redirect */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              bgcolor: color,
              borderRadius: 2.5,
              "&:hover": {
                bgcolor: color,
                filter: "brightness(0.9)",
              },
            }}
          >
            Sign in as {type} →
          </Button>
        </Box>

        {/* Bottom message */}
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
          sx={{
            borderTop: "1px solid #edf0f5",
            mt: 3,
            pt: 2,
          }}
        >
          {type === "Admin"
            ? "Authorized administrators only"
            : "Welcome back to your shopping experience"}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Main landing page
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at 10% 5%, #e0e7ff 0, transparent 35%), linear-gradient(135deg, #f8fafc, #f1f5f9)",
        }}
      >
        {/* Navbar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,0.9)",
            color: "#172033",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Toolbar
            sx={{
              maxWidth: 1100,
              width: "100%",
              mx: "auto",
            }}
          >
            <ShoppingBag
              sx={{ color: "#4f46e5", mr: 1 }}
            />

            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ flexGrow: 1 }}
            >
              Shopora.
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Your shopping, simplified.
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          {/* Hero section */}
          <Box
            sx={{
              textAlign: "center",
              pt: { xs: 6, md: 8 },
              pb: 5,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                bgcolor: "#e0e7ff",
                color: "#4338ca",
                px: 2,
                py: 1,
                borderRadius: 10,
                fontWeight: 800,
              }}
            >
              WELCOME TO SHOPORA
            </Typography>

            <Typography
              component="h1"
              sx={{
                mt: 3,
                fontWeight: 850,
                fontSize: {
                  xs: 32,
                  sm: 44,
                  md: 50,
                },
                letterSpacing: "-1.5px",
                lineHeight: 1.2,
              }}
            >
              One platform.{" "}
              <Box
                component="span"
                sx={{ color: "#4f46e5" }}
              >
                Two experiences.
              </Box>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Choose your portal to get started. Manage your
              store or explore products made for you.
            </Typography>
          </Box>

          {/* Two login cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: 3.5,
              maxWidth: 960,
              mx: "auto",
              pb: 8,
            }}
          >
            {/* Admin login */}
            <LoginCard
              type="Admin"
              title="Admin Login"
              description="Manage products, inventory, and your online store from one dashboard."
              storageKey="shopora_admin_login"
              color="#4f46e5"
              Icon={AdminPanelSettings}
            />

            {/* Customer login */}
            <LoginCard
              type="Customer"
              title="Customer Login"
              description="Access your account, update your profile, and enjoy shopping."
              storageKey="shopora_customer_login"
              color="#059669"
              Icon={ShoppingBag}
            />
          </Box>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            textAlign: "center",
            py: 3,
            borderTop: "1px solid #e5e7eb",
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          © 2026 Shopora. All rights reserved.
        </Box>
      </Box>
    </ThemeProvider>
  );
}
