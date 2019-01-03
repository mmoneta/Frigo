<?php
  class Frigo extends CI_Controller {
    function __construct() {
      parent::__construct();
      $this->load->helper('url');
      // $this->load->model('Frigo_Model');
    }

    public function index() {
      $this->load->view('index');
    }

    public function users($creator) {
      $query = $this->db->query('SELECT * FROM `cards` WHERE Creator = "'.$creator.'"');
      echo json_encode($query->result(), JSON_PRETTY_PRINT);
    }
    
    public function add() {
      $creator = $this->input->post('creator');
      $identity = $this->input->post('identity');
      $width = $this->input->post('width');
      $height = $this->input->post('height');
      $top = $this->input->post('top');
      $left = $this->input->post('left');
      $index = $this->input->post('index');

      $data = array(
        'Creator' => $creator,
        'Identity' => $identity,
        'Width' => $width,
        'Height' => $height,
        'Top' => $top,
        'Left' => $left,
        'Index' => $index
      );

      $this->db->insert('cards', $data);
    }
    
    public function size() {
      $creator = $this->input->post('creator');
      $identity = $this->input->post('identity');
      $width = $this->input->post('width');
      $height = $this->input->post('height');

      $data = array( 
        'Width' => $width, 
        'Height' => $height 
      );

      $this->db->set($data); 
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->update('cards', $data);
    }
    
    public function position() {
      $creator = $this->input->post('creator');
      $identity = $this->input->post('identity');
      $top = $this->input->post('top');
      $left = $this->input->post('left');

      $data = array( 
        'Top' => $top, 
        'Left' => $left 
      ); 

      $this->db->set($data); 
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->update('cards', $data);
    }
    
    public function content() {
      $creator = $this->input->post('creator');
      $identity = $this->input->post('identity');
      $content = $this->input->post('content');

      $data = array( 
        'Content' => $content
      );

      $this->db->set($data); 
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->update('cards', $data);
    }
    
    public function delete() {
      $creator = $this->input->post('creator');
      $identity = $this->input->post('identity');

      $this->db->where('Identity', $identity);
      $this->db->delete('cards');
    }
  }
?>