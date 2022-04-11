import { COLORS } from 'themes/common'

export const tags = {
  published: {
    label: 'Published',
    color: COLORS.palette.primaryBlue,
    bgColor: COLORS.palette.secondaryBlue3,
  },
  processing: {
    label: 'Processing',
    color: COLORS.palette.primaryBlue,
    bgColor: COLORS.palette.secondaryBlue3,
  },
  completed: {
    label: 'Completed',
    color: COLORS.accent.viridianGreen1,
    bgColor: COLORS.accent.viridianGreen2,
  },
  on_hold: {
    label: 'On Hold',
    color: COLORS.accent.apricotOrange1,
    bgColor: COLORS.accent.apricotOrange2,
  },
  pending: {
    label: 'Pending',
    color: COLORS.accent.starYellow,
    bgColor: COLORS.accent.mustardYellow2,
  },
  cancelled: {
    label: 'Cancelled',
    color: COLORS.accent.rubyRed1,
    bgColor: COLORS.accent.rubyRed2,
  },
  failed: {
    label: 'Failed',
    color: COLORS.palette.white,
    bgColor: COLORS.accent.rubyRed1,
  },
  refunded: {
    label: 'Refunded',
    color: COLORS.gray.textGray2,
    bgColor: COLORS.gray.disableGray2,
  },
  draft: {
    label: 'Draft',
    color: '#E0982F',
    bgColor: COLORS.accent.apricotOrange2,
  },
  future: {
    label: 'Future',
  },
  private: {
    label: 'Private',
  },
  trash: {
    label: 'Trash',
  },
  incomplete: {
    label: 'Incomplete',
    color: COLORS.accent.rubyRed1,
    bgColor: COLORS.accent.rubyRed2,
  },
  synced: {
    label: 'Synced',
    color: COLORS.accent.viridianGreen1,
    bgColor: COLORS.accent.viridianGreen2,
  },
  importing: {
    label: 'Importing',
    color: COLORS.accent.starYellow,
    bgColor: COLORS.accent.mustardYellow2,
  },
  shipping_prepare: {
    label: 'Preparing',
    color: '#E0982F',
    bgColor: COLORS.accent.apricotOrange2,
  },
  shipping_picked: {
    label: 'Picked Up',
    color: COLORS.accent.viridianGreen1,
    bgColor: COLORS.accent.viridianGreen2,
  },
  shipping_cancelled: {
    label: 'Cancelled',
    color: COLORS.accent.rubyRed1,
    bgColor: COLORS.accent.rubyRed2,
  },
  comment_pending: {
    label: 'Pending',
    color: 'white',
    bgColor: COLORS.accent.apricotOrange1,
  },
  comment_approved: {
    label: 'Approved',
    color: COLORS.accent.viridianGreen1,
    bgColor: COLORS.accent.viridianGreen2,
  },
  in_transit: {
    label: 'In-Transit',
    color: COLORS.palette.primaryBlue,
    bgColor: COLORS.palette.secondaryBlue3,
  },
  partial_check_in: {
    label: 'Partial Check-in',
    color: COLORS.accent.apricotOrange1,
    bgColor: COLORS.accent.apricotOrange2,
  },
  unpaid: {
    label: 'Unpaid',
    color: COLORS.accent.apricotOrange1,
    bgColor: COLORS.accent.apricotOrange2,
  },
  paid: {
    label: 'Paid',
    color: COLORS.accent.viridianGreen1,
    bgColor: COLORS.accent.viridianGreen2,
  },
}
