import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Box,
  Chip,
  Link,
  IconButton,
} from '@mui/material';
import {
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const MuiPostCard = () => {
  return (
    // Equivalent to: <div data-slot="card" class="bg-card ... hover:shadow-md">
    <Card
      sx={{
        maxWidth: 400,
        margin: 'auto',
        borderRadius: 3,
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      {/* Equivalent to: <div data-slot="card-header" class="grid ... px-6"> */}
      <CardHeader
        // User Info Section (Left)
        avatar={
          // Equivalent to: <a href="/profile/..." class="flex items-center gap-3">
          <Link
            href="/profile/nxpb7-..."
            underline="none"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
          >
            <Avatar
              alt="Pedro"
              src="/assets/generated/default-avatar.dim_100x100.png"
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Pedro
              </Typography>
              <Typography variant="caption" color="text.secondary">
                less than a minute ago
              </Typography>
            </Box>
          </Link>
        }
        // Action/Badge Section (Right)
        action={
          // Equivalent to: <span data-slot="badge" class="inline-flex items-center ...">
          <Chip
            size="small"
            label="Quote"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
              </svg>
            }
            sx={{
              bgcolor: 'secondary.light',
              color: 'secondary.contrastText',
              borderColor: 'secondary.main',
              fontWeight: 'medium',
            }}
          />
        }
        sx={{ paddingBottom: 0, paddingRight: 3 }} // Adjust spacing to match original
      />

      {/* Main Content Area */}
      <CardContent sx={{ paddingTop: 0, paddingBottom: '16px !important' }}>
        {/* Book Details Section */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          {/* Cover Image */}
          <Box sx={{ flexShrink: 0 }}>
            <img
              alt="Meditations cover"
              style={{
                height: 128,
                width: 96,
                borderRadius: 8,
                objectFit: 'cover',
              }}
              src="https://covers.openlibrary.org/b/id/211529-M.jpg"
            />
          </Box>

          {/* Title and Author */}
          <Box sx={{ flexGrow: 1, paddingTop: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 'semibold', lineHeight: 'tight' }}
            >
              Meditations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by Marcus Aurelius
            </Typography>
          </Box>
        </Box>

        {/* Quote Block */}
        {/* Equivalent to: <div class="rounded-lg border p-4 border-l-4 border-l-book bg-muted/30 italic"> */}
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main', // Using primary as a placeholder for 'book' color
            bgcolor: 'action.hover', // Placeholder for muted/30
            fontStyle: 'italic',
          }}
        >
          <Typography
            variant="body2"
            sx={{ whiteSpace: 'pre-wrap', lineHeight: 'relaxed' }}
          >
            filosofare
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
