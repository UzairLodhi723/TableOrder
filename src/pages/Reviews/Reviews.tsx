import { Avatar, Box, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarIcon from '@mui/icons-material/Star';
import UserAvatar from '../../component/UserAvatar/UserAvatar';
const image = require("../../Assets/Images/reviewImage.png")
const reviews = [
  {
    table: 'Table no 13',
    date: '22 Oct',
    orderId: '#6124',
    rating: 4.8,
    review:
      'The double cheese patty burger is an absolute game-changer! The juicy beef patties are perfectly complemented by the gooey, melty cheese. It’s the kind of burger that satisfies every craving.',
    img: image,
  },
  {
    table: 'Table no 01',
    date: '24 Dec',
    orderId: '#6130',
    rating: 4.5,
    review:
      'The sushi platter I ordered was fresh, with each piece practically melting in my mouth. The flavors were delicate yet vibrant, and the presentation was top-notch. I’ll definitely be back for more!',
    img: image,
  },
  {
    table: 'Table no 15',
    date: '01 Jan',
    orderId: '#6123',
    rating: 4.2,
    review:
      'The grilled chicken salad had the perfect balance of textures and flavors. The chicken was tender and juicy, and the dressing was light but flavorful. A refreshing and satisfying meal!',
    img:image,
  },
  {
    table: 'Table no 09',
    date: '17 Feb',
    orderId: '#6120',
    rating: 3.5,
    review:
      'The pasta was decent, but the sauce lacked depth. It was a bit too tangy for my taste, but the noodles were cooked well, and the portion size was generous.',
    img: image,
  },
  {
    table: 'Table no 03',
    date: '14 Jan',
    orderId: '#6125',
    rating: 3.3,
    review:
      'The pizza was good, but the crust was a bit too thick for my liking. The toppings were fresh and flavorful, though, and the cheese was perfectly melted. The pepperoni had a nice crisp to it, and the veggies added a great crunch. However, the overall dough-to-topping ratio felt a bit off. If you like… The pizza was good, but the crust was a bit too thick for my liking. The toppings were fresh and flavorful, though, and the cheese was perfectly melted. The pepperoni had a nice crisp to it, and the veggies added a great crunch. However, the overall dough-to-topping ratio felt a bit off. If you like…',
    img: image,
  },
];
const Reviews = () => {
  return (
    <Box p={2} bgcolor={"#fff"} pb={10}>
      <Box display={"flex"} justifyContent={"space-between"} my={3} mx={1}>
      <Typography variant="h5" color='rgba(70, 66, 85, 1)'> Customer Reviews</Typography>
      <UserAvatar/>
      </Box>
      <Grid container spacing={6} mt={4}>
        {reviews.map((review, index) => (
          <Grid size={{xs:12,md:6,lg:6}} key={index}>
            <Card

              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mx:.5,
                px: 3,
                pb:5,
                pt:1,
                height:182.66778564453125,
              
                bgcolor:"#F6F6F6",
                borderRadius: 3,
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {review.table}
                  </Typography>
                  <Typography variant="body2">
                    · {review.date}
                  </Typography>
                  <Avatar src={review.img} sx={{ width: 40, height: 40 }} />
                </Box>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Typography variant="body2">
                  {review.orderId}
                </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  ml:1,
                  alignSelf: 'flex-end',
                  backgroundColor: '#000',
                  color: '#FFF',
                  borderRadius: 1,
                  paddingX: 1.5,
                  paddingY: 0.3,
                }}
              >
                <StarIcon sx={{ color: '#FFC107', fontSize: 18 }} />
                <Typography variant='h6' fontWeight="bold" >{review.rating}</Typography>
              </Box>
                </Box>
              </Box>

              <Typography variant="body2" overflow={"auto"} sx={{scrollbarWidth:0}}>
                {review.review}
              </Typography>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Reviews