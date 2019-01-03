<?php
  class Frigo extends CI_Controller {
    function __construct() {
      parent::__construct();
      $this->load->helper('url');
      $this->load->model('Frigo_model');
    }

    public function index() {
      $this->load->view('index');
    }

    public function users($creator) {
      echo json_encode($this->Frigo_model->get_cards_by_creator($creator), JSON_PRETTY_PRINT);
    }
    
    public function add() {
      $this->Frigo_model->insert_card();
    }
    
    public function size() {
      $this->Frigo_model->update_size();
    }
    
    public function position() {
      $this->Frigo_model->update_position();
    }
    
    public function content() {
      $this->Frigo_model->update_content();
    }
    
    public function delete() {
      $this->Frigo_model->delete_card();
    }
  }
?>