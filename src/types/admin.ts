

export interface AdminDashboardApiType{
    users: {
      total: number
      active: number
      customers: number
      businesses: number
    }
    wallet: {
      total_balance: string
      total_withdraw: string
      total_earning: number
    }
    customer_satisfaction: {
      percentage: number
      max_rating: number
    }
    business_category_bar: {
      retail: number
      labor_service: number
      food_service: number
      rental: number
      ecommerce: number
    }
    business_involved_pie: Array<{
      id: number
      name: string
      description: string
      business: number
    }>
    earning_curve: Array<any>
    recent_activities: Array<{
      id: number
      date: string
      user: string
      action: string
      details: string
      created_at: string
      updated_at: string
    }>
  }


export interface AdminEventsApiType{
  id: number
  organizer_id: number
  title: string
  description: string
  sport_type: string
  sport_name: string
  starting_date: string
  ending_date: string
  time: string
  location: string
  latitude: string
  longitude: string
  number_of_player_required: number
  number_of_team_required: number
  number_of_player_required_in_a_team: number
  entry_fee: string
  prize_amount: string
  prize_distribution: Array<{
    place: string
    percentage: number
    additional_prize: string
    percentage_amount: number
  }>
  rules_guidelines: string
  image: string
  status: string
  view: number
  share: number
  created_at: string
  updated_at: string
  image_url: string
  organizer: {
    id: number
    full_name: string
    user_name: string
    avatar_url: string
  }
}
export interface AdminContenttype{
    id: number
    business_id: number
    product_id: number
    customer_id: number
    title: string
    rating: number
    experience: string
    status: string
    created_at: string
    updated_at: string
    customer: {
      id: number
      full_name: string
      role: string
      avatar_url: string
    }
  }