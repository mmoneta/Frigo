<?php
  class Frigo extends CI_Controller {
    function __construct() {
      parent::__construct();
      $this->load->helper('url');
      $this->load->library('user_agent');
    }

    public function index() {
      $this->load->view('index');
    }

    public function users($nick) {
      //$query = $this->db->query('SELECT * FROM `Frigo` WHERE Author = "'.$nick.'"');
      //echo json_encode($query->result(), JSON_PRETTY_PRINT);
      echo('ss');
    }
    
    public function add($nick, $identity, $width, $height, $top, $left, $index) {
      $data = array(
        'Author' => $nick,
        'Identity' => $identity,
        'Width' => $width,
        'Height' => $height,
        'Top' => $top,
        'Left' => $left,
        'Index' => $index
      );
      $this->db->insert('Frigo', $data);
    }
    
    public function size($nick, $identity, $width, $height) {
      $data = array( 
        'Width' => $width, 
        'Height' => $height 
      ); 
      $this->db->set($data); 
      $this->db->where('Author', $nick);
      $this->db->where('Identity', $identity);
      $this->db->update('Frigo', $data);
    }
    
    public function position($nick, $identity, $top, $left) {
      $data = array( 
        'Top' => $top, 
        'Left' => $left 
      ); 
      $this->db->set($data); 
      $this->db->where('Author', $nick);
      $this->db->where('Identity', $identity);
      $this->db->update('Frigo', $data);
    }
    
    public function content() {
      $nick = $this->input->post('nick');
      $identity = $this->input->post('identity');
      $content = $this->input->post('content');
      $data = array( 
        'Content' => $content
      ); 
      $this->db->set($data); 
      $this->db->where('Author', $nick);
      $this->db->where('Identity', $identity);
      $this->db->update('Frigo', $data);
    }
    
    public function delete($nick, $identity) {
      $this->db->where('Author', $nick);
      $this->db->where('Identity', $identity);
      $this->db->delete('Frigo');
    }
  }
?>