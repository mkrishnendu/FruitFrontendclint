import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Paper, Fab, Collapse, Chip, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({user:`${JSON.parse(localStorage.getItem('auth')).user}`, question: '', answer: '', author: '', category: '' });
  const [formVisible, setFormVisible] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingFaq, setEditingFaq] = useState(null);
  const [loading,setLoading]=useState(true);

  // console.log(JSON.parse(localStorage.getItem('auth')).user);
  const user=JSON.parse(localStorage.getItem('auth')).user
  
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVICE_URL}/faqs`);
      const fetchedFaqs = response.data;
      setFaqs(fetchedFaqs);
      const uniqueCategories = [...new Set(fetchedFaqs.map((faq) => faq.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    }finally{
      setLoading(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        console.log(editingFaq);
        console.log(newFaq);
        const {_id,...updatedData}=newFaq;
        console.log(updatedData);
        
        
        const response = await axios.put(`${import.meta.env.VITE_SERVICE_URL}/faqs/${editingFaq._id}`, updatedData);
        if (response) {
          alert('FAQ updated successfully');
        }
      } else {
        const response = await axios.post(`${import.meta.env.VITE_SERVICE_URL}/faqs`, newFaq);
        if (response) {
          alert('FAQ added successfully');
        }
      }
      setNewFaq({ question: '', answer: '', author: '', category: '' });
      setFormVisible(false);
      setEditingFaq(null);
      fetchFaqs();
    } catch (error) {
      console.error('Failed to submit FAQ:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVICE_URL}/faqs/${id}`);
      if (response) {
        alert('FAQ deleted successfully');
        fetchFaqs();
      } else {
        alert('FAQ not deleted, try again');
      }
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setNewFaq(faq);
    setFormVisible(true);
  };

  const handleExpandClick = (faqId) => {
    setExpandedFaqId(expandedFaqId === faqId ? null : faqId);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3, md: 4 },
        marginTop: { xs: 6, sm: 8, md: 10 },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        FAQs
      </Typography>

      {!formVisible && (
        <Fab
          aria-label="add"
          onClick={() => {
            setEditingFaq(null);
            setFormVisible(true);
          }}
          sx={{ marginBottom: 4 ,background:"linear-gradient(45deg, #000000 30%, #4f4f4f 90%)"}}
        >
          <AddIcon sx={{color:'white'}}/>
        </Fab>
      )}

      {formVisible && (
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            boxShadow: '5px 3px rgba(33, 34, 43, 0.5)',
            width: '100%',
            maxWidth: { xs: '100%', sm: 500, md: 600 },
            marginBottom: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Question"
              variant="outlined"
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Answer"
              variant="outlined"
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={newFaq.author}
              onChange={(e) => setNewFaq({ ...newFaq, author: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={newFaq.category}
              onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #000000 30%, #4f4f4f 90%)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1e88e5',
                },
              }}
            >
              {editingFaq ? 'Update FAQ' : 'Add FAQ'}
            </Button>
          </form>
          <Button
            onClick={() => setFormVisible(false)}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Cancel
          </Button>
        </Paper>
      )}

      <div style={{ marginBottom: 16 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              margin: 0.5,
              borderRadius: '50%',
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              padding: { xs: '4px', sm: '6px' },
            }}
            color={selectedCategory === category ? 'secondary' : 'default'}
          />
        ))}
        <Chip
          label="All"
          onClick={() => setSelectedCategory('')}
          sx={{
            margin: 0.5,
            borderRadius: '50%',
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
            padding: { xs: '4px', sm: '6px' },
          }}
          color={selectedCategory === '' ? 'secondary' : 'default'}
        />
      </div>

      {loading?(
        <CircularProgress
        sx={{
          display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4,
        }}
        />
      ):(  
      <List sx={{ width: '100%', maxWidth: { xs: '100%', sm: 500, md: 600 } }}>
        {filteredFaqs && filteredFaqs.map((faq) => (
          <ListItem
            key={faq._id}
            divider
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              maxWidth: { xs: '100%', sm: 500, md: 600 },
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: { xs: 1, sm: 2 },
            }}
            onClick={() => handleExpandClick(faq._id)}
          >
            <ListItemText
              primary={faq.question}
              secondary={
                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                    <Typography variant="small">Author: {faq.author}</Typography>
                    <Typography variant="small">Category: {faq.category}</Typography>
                  </div>
                  <Typography
                    variant="body2"
                    sx={{
                      display: expandedFaqId === faq._id ? 'block' : '-webkit-box',
                      WebkitLineClamp: expandedFaqId === faq._id ? 'none' : 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {faq.answer}
                  </Typography>
                  <Collapse in={expandedFaqId === faq._id} timeout="auto" unmountOnExit>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {faq.answer}
                    </Typography>
                  </Collapse>
                </>
              }
              primaryTypographyProps={{ variant: 'h6' }}
            />
            {user==faq.user?
            (<>
            <IconButton edge="end" onClick={(e) => { e.stopPropagation(); handleDelete(faq._id); }}>
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(faq); }}>
              <EditIcon color="primary" />
            </IconButton></>
            ):''
            }
            <IconButton onClick={(e) => { e.stopPropagation(); handleExpandClick(faq._id); }}>
              {expandedFaqId === faq._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </ListItem>
        ))}
      </List>
      )}  
    </Container>
  );
};

export default FaqPage;

